import _ from 'lodash';

import Types from './Types';

export default function createModel(schema = {}, actions = {}) {
  let attributes = {};

  function defineAttributes(context, attrs, pathPrefix = '') {
    _.each(attrs, (v, k) => {
      Object.defineProperty(context, k, {
        get() {
          const getPath = pathPrefix
            ? pathPrefix + '.' + k
            : k;

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

  return Model;
}
