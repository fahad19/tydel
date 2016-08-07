import _ from 'lodash';

import MethodError from './errors/Method';
import CollectionError from './errors/Collection';
import isModel from './isModel';
import BaseCollection from './base/Collection';
import Event from './base/Event';
import isEvent from './isEvent';
import applyEventsMixin from './mixins/events';
import bubbleUpEvent from './utils/bubbleUpEvent';

export default function createCollection(Model, methods = {}) {
  class Collection extends BaseCollection {
    constructor(givenModels = []) {
      super(givenModels);

      const models = [];

      // others listening to this
      let listeners = {};

      applyEventsMixin(this, listeners);

      const bubbleUp = (model, eventName) => {
        return bubbleUpEvent(this, model, eventName, (ctx, m) => {
          return [ctx.findIndex(m)];
        });
      };

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
        const index = result - 1;
        this.trigger('change', new Event({
          path: [index]
        }));
        this.trigger('method:change', new Event({
          path: ['push']
        }));

        const changeWatcher = bubbleUp(model, 'change');
        const methodCallWatcher = bubbleUp(model, 'method:call');
        const methodChangeWatcher = bubbleUp(model, 'method:change');

        model.on('destroy', () => {
          this.remove(model);
          changeWatcher();
          methodCallWatcher();
          methodChangeWatcher();
        });

        model.on('remove', () => {
          this.trigger('change');
          changeWatcher();
          methodCallWatcher();
          methodChangeWatcher();
        });

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
        'findIndex',
        'first',
        'last',
        'nth',
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

        this.trigger('change', new Event({
          path: [0]
        }));

        const changeWatcher = bubbleUp(model, 'change');
        const methodCallWatcher = bubbleUp(model, 'method:call');
        const methodChangeWatcher = bubbleUp(model, 'method:change');

        model.on('destroy', () => {
          this.remove(model);
          this.trigger('change');

          changeWatcher();
          methodCallWatcher();
          methodChangeWatcher();
        });

        return result;
      };

      this.remove = function (model) {
        const index = this.findIndex(model);

        this.removeFrom(index);
      };

      this.removeFrom = function (index) {
        const model = models[index];

        if (!model) {
          return;
        }

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
