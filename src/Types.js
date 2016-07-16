import _ from 'lodash';

import TypeError from './errors/Type';

/**
 * Chain
 */
const chainables = {
  isRequired(value) {
    if (typeof value === 'undefined') {
      throw new TypeError('value is not defined');
    }

    return value;
  },

  defaults(defaultValue) {
    return (value = defaultValue) => {
      return value;
    };
  },

  isTooLong(value) {
    if (typeof value === 'string' && value.length > 5) {
      throw new TypeError('value is too long');
    }

    return value;
  }
};

function chain(fn, omitChainables = []) {
  _.each(chainables, (chainFunc, chainName) => {
    if (omitChainables.indexOf(chainName) > -1) {
      return;
    }

    Object.defineProperty(fn, chainName, {
      get: function () {
        const getterFunc = function (value) {
          return chainFunc(value);
        };

        return chain(getterFunc, omitChainables.concat([chainName]));
      }
    });
  });

  return fn;
}

/**
 * Types
 */
const Types = {};

Types.string = chain(function (value) {
  if (typeof value !== 'string') {
    throw new TypeError('value is not a string');
  }

  return value;
});

export default Types;
