import _ from 'lodash';

import Types from './Types';
import isModel from './isModel';
import isCollection from './isCollection';
import MethodError from './errors/Method';
import BaseModel from './base/Model';
import applyEventsMixin from './mixins/events';

export default function createModel(schema = {}, methods = {}) {
  class Model extends BaseModel {
    constructor(givenAttributes = {}) {
      super(givenAttributes);
      const self = this;

      let attributes = {};

      // others listening to this
      let listeners = {};

      // apply mixins
      applyEventsMixin(this, listeners);

      // built-in methods
      Object.defineProperty(this, 'toJS', {
        value: function () {
          function convertToJS(attrs) {
            return _.mapValues(attrs, (v, k) => {
              if (
                isModel(v) ||
                isCollection(v)
              ) {
                return v.toJS();
              }

              if (_.isPlainObject(v)) {
                return convertToJS(v);
              }

              return v;
            });
          }

          return convertToJS(attributes);
        }
      });

      Object.defineProperty(this, 'destroy', {
        value: function () {
          this.trigger('destroy');
          this.off();

          _.each(attributes, function (v, k) {
            if (isModel(v) || isCollection(v)) {
              v.destroy();
            }
          });
        }
      });

      // parse by schema
      const applySchema = Types.object.of(schema);
      attributes = applySchema(givenAttributes);

      // define attributes
      _.each(attributes, (value, attributeName) => {
        Object.defineProperty(this, attributeName, {
          get() {
            return attributes[attributeName];
          },

          set(newValue) {
            try {
              schema[attributeName](newValue);
              attributes[attributeName] = newValue;

              self.trigger('change');
            } catch (typeError) {
              throw typeError;
            }
          },

          enumerable: true
        });

        // watch children
        if (isModel(value)) {
          const watcher = value.on('change', function () {
            self.trigger('change');
          });

          value.on('destroy', function () {
            self.trigger('change');
            watcher();
          });
        }
      });

      // define methods
      _.each(methods, (func, methodName) => {
        if (
          typeof attributes[methodName] !== 'undefined' ||
          typeof this[methodName] !== 'undefined'
        ) {
          throw new MethodError('conflicting method name: ' + methodName);
        }

        this[methodName] = func.bind(this);
      });
    }
  }

  return Model;
}
