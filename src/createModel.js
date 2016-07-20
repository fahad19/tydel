import _ from 'lodash';

import Types from './Types';
import isModel from './isModel';
import isCollection from './isCollection';
import ActionError from './errors/Action';
import BaseModel from './base/Model';

export default function createModel(schema = {}, actions = {}) {
  class Model extends BaseModel {
    constructor(givenAttributes = {}) {
      super(givenAttributes);

      let attributes = {};

      // built-in methods
      Object.defineProperty(this, 'toJS', {
        get() {
          return function () {
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
          };
        }
      });

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

      // define actions
      _.each(actions, (func, actionName) => {
        if (
          typeof attributes[actionName] !== 'undefined' ||
          typeof this[actionName] !== 'undefined'
        ) {
          throw new ActionError('conflicting action: ' + actionName);
        }

        this[actionName] = func.bind(this);
      });
    }
  }

  return Model;
}
