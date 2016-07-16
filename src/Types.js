import _ from 'lodash';

import TypeError from './errors/Type';

/**
 * Chain
 */
const chainables = {
  isRequired: {
    func: function isRequired(value) {
      if (typeof value === 'undefined') {
        throw new TypeError('value is not defined');
      }

      return value;
    }
  },

  defaults: {
    isFactory: true,
    func: function defaults(value, defaultValue) {
      if (value) {
        return value;
      }

      return defaultValue;
    }
  }
};

function chain(fn, omitChainables = []) {
  _.each(chainables, (chainObj, chainName) => {
    const chainFunc = chainObj.func;
    const chainIsFactory = chainObj.isFactory === true;

    if (omitChainables.indexOf(chainName) > -1) {
      return;
    }

    Object.defineProperty(fn, chainName, {
      get: function () {
        if (chainIsFactory) {
          return function (...args) {
            return chain(function (value) {
              let nextValue = chainFunc(value, ...args);

              return fn(nextValue);
            });
          };
        }

        return chain(function (value) {
          let nextValue = value;

          nextValue = chainFunc(nextValue);
          nextValue = fn(nextValue);

          return nextValue;
        }, omitChainables.concat([chainName]));
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
