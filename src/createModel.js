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

  function Model(givenAttributes = {}) {
    const applySchema = Types.object.of(schema);
    attributes = applySchema(givenAttributes);

    defineAttributes(this, attributes);
  }

  return Model;
}
