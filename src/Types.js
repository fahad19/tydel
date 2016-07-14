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

/**
 * string
 */
export function string(value) {
  return typeof value === 'string';
}

string.isRequired = makeIsRequired(string);
string.defaults = makeDefaults(string);
