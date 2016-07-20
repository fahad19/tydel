import _ from 'lodash';

import Types from './Types';
import isModel from './isModel';
import isCollection from './isCollection';
import MethodError from './errors/Method';
import BaseModel from './base/Model';

export default function createModel(schema = {}, methods = {}) {
  class Model extends BaseModel {
    constructor(givenAttributes = {}) {
      super(givenAttributes);

      let attributes = {};
      let listeners = {};

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

      Object.defineProperty(this, 'on', {
        value: function (event, fn) {
          // sets listener
        }
      });

      Object.defineProperty(this, 'trigger', {
        value: function (event, ...args) {
          // triggers event
        }
      });

      Object.defineProperty(this, 'off', {
        value: function (event, fn = null) {
          // unlistens
        }
      });

      Object.defineProperty(this, 'destroy', {
        value: function () {
          // kills all listeners
          // destroys self
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
            if (schema[attributeName](newValue)) {
              attributes[attributeName] = newValue;
            }
          },

          enumerable: true
        });
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
