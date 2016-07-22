import _ from 'lodash';

import MethodError from './errors/Method';
import CollectionError from './errors/Collection';
import isModel from './isModel';
import BaseCollection from './base/Collection';
import applyEventsMixin from './mixins/events';

export default function createCollection(Model, methods = {}) {
  class Collection extends BaseCollection {
    constructor(givenModels = []) {
      super(givenModels);

      const models = [];

      // others listening to this
      let listeners = {};

      applyEventsMixin(this, listeners);

      this.at = function (n) {
        return models[n];
      };

      this.push = function (model) {
        if (!isModel(model)) {
          throw new CollectionError('not a valid Model instance is being pushed');
        }

        if (!(model instanceof Model)) {
          throw new CollectionError('Model instance is not of the one Collection is expecting');
        }

        const result = models.push(model);
        this.trigger('change');

        const watcher = model.on('change', () => {
          this.trigger('change');
        });

        model.on('destroy', function () {
          watcher();
        });

        return result;
      };

      this.forEach = function (fn) {
        return models.forEach(fn.bind(this));
      };

      this.map = function (fn) {
        return models.map(fn.bind(this));
      };

      this.reduce = function (fn) {
        return models.reduce(fn.bind(this));
      };

      // this.pop = function () {
      //   return models.pop();
      // };

      // this.shift = function () {
      //   return models.shift();
      // };

      // this.unshift = function (model) {

      // };

      // this.remove = function (model) {

      // };

      this.destroy = function () {

      };

      this.toJS = function () {
        return models.map((model) => {
          return model.toJS();
        });
      };

      // methods
      _.each(methods, (methodFunc, methodName) => {
        if (typeof this[methodName] !== 'undefined') {
          throw new MethodError('conflicting method name: ' + methodName);
        }

        this[methodName] = methodFunc.bind(this);
      });

      // initialize
      givenModels.forEach((v) => {
        if (isModel(v)) {
          this.push(v);

          return;
        }

        const model = new Model(v);
        this.push(model);
      });
    }
  }

  return Collection;
}
