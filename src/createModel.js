import _ from 'lodash';

import Types from './Types';
import isModel from './isModel';

export default function createModel(schema = {}, actions = {}) {
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
      attributes[actionName] = action;

      Object.defineProperty(context, actionName, {
        get() {
          return function (...args) {
            return action.bind(attributes)(...args);
          };
        }
      });
    });
  }

  function Model(givenAttributes = {}) {
    const applySchema = Types.object.of(schema);
    attributes = applySchema(givenAttributes);

    defineAttributes(this, attributes);
    defineActions(this, actions);
  }

  Model.prototype.toJS = function () {
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

  return Model;
}
