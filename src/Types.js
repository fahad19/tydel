import _ from 'lodash';

function makeIsRequired(fn) {
  return function (value) {
    if (typeof value === 'undefined') {
      return false;
    }

    return fn;
  };
}

function makeDefaults(fn) {
  return function (defaultValue) {
    return function (value = defaultValue) {
      return fn(value);
    };
  };
}

const chainables = {
  isRequired(value) {
    if (typeof value === 'undefined') {
      return false;
    }

    return true;
  },
  isTooLong(value) {
    if (typeof value === 'string' && value.length > 5) {
      return false;
    }

    return true;
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
 * string
 */
export const string = function (value) {
  return typeof value === 'string';
}

chain(string);

// string.isRequired = makeIsRequired(string);
// string.defaults = makeDefaults(string);
