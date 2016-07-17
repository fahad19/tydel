import _ from 'lodash';

import Types from './Types';
import isModel from './isModel';
import ActionError from './errors/Action';

export default function createModel(schema = {}, actions = {}) {
  const schemaKeys = _.keys(schema);
  const actionKeys = _.keys(actions);
  const commonKeys = _.intersection(schemaKeys, actionKeys);

  if (commonKeys.length > 0) {
    const commonKeysList = commonKeys
      .map(item => '`' + item + '`')
      .join(', ');

    throw new ActionError('conflicting action and schema: ' + commonKeysList);
  }

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
      attributes[actionName] = action;

      Object.defineProperty(context, actionName, {
        get() {
          return function (...args) {
            const output = action.bind(attributes)(...args);

            applySchema(attributes);

            return output;
          };
        }
      });
    });
  }

  function Model(givenAttributes = {}) {
    applySchema = Types.object.of(schema);
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
