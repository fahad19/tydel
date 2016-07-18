import _ from 'lodash';

import Types from './Types';
import isModel from './isModel';
import ActionError from './errors/Action';

export default function createModel(schema = {}, actions = {}) {
  function Model(givenAttributes = {}) {
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

    function defineActions(context, actions) {
      _.each(actions, (action, actionName) => {
        if (typeof attributes[actionName] !== 'undefined') {
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

    applySchema = Types.object.of(schema);
    attributes = applySchema(givenAttributes);

    defineAttributes(this, attributes);
    defineActions(this, actions);

    this.toJS = function () {
      function convertToJS(attrs) {
        return _.mapValues(attrs, (v, k) => {
          if (isModel(v)) {
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

  return Model;
}
