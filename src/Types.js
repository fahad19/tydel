import _ from 'lodash';

import TypeError from './errors/Type';
import chain from './chainType';
import isModel from './isModel';

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

Types.bool = chain(function (value) {
  if (typeof value !== 'boolean') {
    throw new TypeError('value is not a boolean');
  }

  return value;
});

Types.number = chain(function (value) {
  if (typeof value !== 'number') {
    throw new TypeError('value is not a number');
  }

  return value;
});

Types.array = chain(function (value) {
  if (!_.isArray(value)) {
    throw new TypeError('value is not an array');
  }

  return value;
});

/**
 * Object
 */
Types.object = chain(function (value) {
  if (!_.isPlainObject(value)) {
    throw new TypeError('value is not an object');
  }

  return value;
});

function validateAndReturnObject(value, schema) {
  return _.mapValues(schema, (type, k) => {
    try {
      return type(value[k]);
    } catch (e) {
      throw new TypeError('schema failed for key `' + k + '`, ' + e.message);
    }
  });
}

Types.object.of = function (schema) {
  if (!_.isPlainObject(schema)) {
    throw new TypeError('`object.of` must receive a plain object');
  }

  return chain(function (value) {
    if (!_.isPlainObject(value)) {
      throw new TypeError('value is not an object');
    }

    return validateAndReturnObject(value, schema);
  });
};

/**
 * Model
 */
Types.model = chain(function (value) {
  if (isModel(value)) {
    return value;
  }

  if (_.isPlainObject(value)) {
    return new Model(value);
  }

  throw new TypeError('value is neither a model instance nor object');
});

Types.model.of = function (Model) {
  if (typeof Model !== 'function') {
    throw new TypeError('Model is not a function');
  }

  return chain(function (value) {
    if (isModel(value)) {
      if (value instanceof Model) {
        return value;
      }

      throw new TypeError('value is not instance of expected Model');
    }

    if (_.isPlainObject(value)) {
      return new Model(value);
    }

    throw new TypeError('value is not an object');
  });
};

export default Types;
