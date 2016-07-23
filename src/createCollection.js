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

      Object.defineProperty(this, 'length', {
        get() {
          return models.length;
        }
      });

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

        model.on('remove', function () {
          watcher();
        })

        return result;
      };

      // native array methods
      [
        'every',
        'filter',
        'find',
        'forEach',
        'includes',
        'indexOf',
        'map',
        'reduce',
        'some',
      ].forEach((readOnlyMethod) => {
        this[readOnlyMethod] = function (fn, ...args) {
          return models[readOnlyMethod](fn.bind(this), ...args);
        };
      });

      // lodash methods
      [
        'difference',
        'find',
        'findIndex',
        'first',
        'head',
        'last',
        'nth',
        'tail',
        'take',
        'takeRight',
      ].forEach((lodashMethod) => {
        this[lodashMethod] = function (...args) {
          return _[lodashMethod](models, ...args);
        };
      });

      this.pop = function () {
        const model = models.pop();

        this.trigger('change');

        model.trigger('remove');

        return model;
      };

      this.shift = function () {
        const model = models.shift();

        this.trigger('change');

        model.trigger('remove');

        return model;
      };

      this.unshift = function (model) {
        if (!isModel(model)) {
          throw new CollectionError('not a valid Model instance is being pushed');
        }

        if (!(model instanceof Model)) {
          throw new CollectionError('Model instance is not of the one Collection is expecting');
        }

        const result = models.unshift(model);

        this.trigger('change');

        const watcher = model.on('change', () => {
          this.trigger('change');
        });

        model.on('destroy', function () {
          watcher();
        });

        return result;
      };

      this.remove = function (model) {
        const index = this.findIndex(model);

        this.removeFrom(index);
      };

      this.removeFrom = function (index) {
        const model = models[index];

        models.splice(index, 1);

        model.destroy();

        this.trigger('change');
      };

      this.destroy = function () {
        models.forEach(function (model) {
          model.destroy();
        });

        this.trigger('destroy');
        this.off();
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
