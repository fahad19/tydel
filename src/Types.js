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
  isRequired: makeIsRequired,
  defaults: makeDefaults
};

function chain(fn, omitChainables = []) {
  const omit = _.isArray(omitChainables)
    ? omitChainables
    : [omitChainables];

  _.each(chainables, (chainFunc, chainName) => {
    if (omit.indexOf(chainName)) {
      return;
    }

    Object.defineProperty(fn, name, {
      get: function () {

      }
    });
  };

  return fn;
}

/**
 * string
 */
export function string(value) {
  return typeof value === 'string';
}

chain(string);

// string.isRequired = makeIsRequired(string);
// string.defaults = makeDefaults(string);
