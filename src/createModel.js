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

      let applySchema = () => {};
      let attributes = {};

      function defineAttributes(context, attrs, pathPrefix = '') {
        _.each(attrs, (v, k) => {
          Object.defineProperty(context, k, {
            get() {
              const getPath = pathPrefix
                ? pathPrefix + '.' + k
                : k;

              if (isModel(v)) {
                return v;
              }

              const result = _.clone(_.get(attributes, getPath));

              if (_.isPlainObject(result)) {
                defineAttributes(result, result, getPath);
              }

              return result;
            }
          });
        });
      }

      const defineActions = (context, actions) => {
        _.each(actions, (action, actionName) => {
          if (
            typeof attributes[actionName] !== 'undefined' ||
            typeof this[actionName] !== 'undefined'
          ) {
            throw new ActionError('conflicting action: ' + actionName);
          }

          attributes[actionName] = action;

          Object.defineProperty(context, actionName, {
            get() {
              return function (...args) {
                // @TODO: needs to be made efficient later
                const clonedAttributes = _.clone(attributes);
                action.bind(clonedAttributes)(...args);
                applySchema(clonedAttributes);

                return action.bind(attributes)(...args);
              };
            }
          });
        });
      }

      this.toJS = function () {
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

      applySchema = Types.object.of(schema);
      attributes = applySchema(givenAttributes);

      defineAttributes(this, attributes);
      defineActions(this, actions);
    }
  }

  return Model;
}
