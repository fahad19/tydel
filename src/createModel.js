import _ from 'lodash';

import Types from './Types';

export default function createModel(schema = {}, actions = {}) {
  let attributes = {};

  function defineAttributes(context, attrs, getterPrefix = '') {
    _.each(attrs, (v, k) => {
      if (_.isPlainObject(v)) {
        // Object.defineProperty(context, k, {
        //   get() {
        //     return attributes[k];
        //   }
        // });
        context[k] = v;

        const nextGetterPrefix = getterPrefix
          ? getterPrefix + '.' + k
          : k;

        defineAttributes(context[k], v, nextGetterPrefix);

        return;
      }

      Object.defineProperty(context, k, {
        get() {
          const getterPath = getterPrefix
            ? getterPrefix + '.' + k
            : k;

          console.log({ getterPath });

          return _.get(attributes, getterPath);
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
