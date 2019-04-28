import castArray from 'lodash/castArray';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import isBoolean from 'lodash/isBoolean';

import TypesError from './errors/Type';
import chain from './chainType';
import isModel from './isModel';
import isCollection from './isCollection';

/**
 * Types
 */
const Types = {};

Types.string = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    throw new TypesError('value is not a string');
  }

  return value;
});

Types.bool = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (!isBoolean(value)) {
    throw new TypesError('value is not a boolean');
  }

  return value;
});

Types.number = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (!isNumber(value)) {
    throw new TypesError('value is not a number');
  }

  return value;
});

Types.array = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (!isArray(value)) {
    throw new TypesError('value is not an array');
  }

  return value;
});

Types.func = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (!isFunction(value)) {
    throw new TypesError('value is not a function');
  }

  return value;
});

Types.enum = function (options = []) {
  const enums = castArray(options);

  return chain(function (value) {
    if (isUndefined(value)) {
      return value;
    }

    const isValid = enums.some(function (enumValue) {
      return value === enumValue;
    });

    if (isValid) {
      return value;
    }

    throw new TypesError('value is none of the provided enums');
  });
};

Types.enum.of = function (options = []) {
  const enumTypes = castArray(options);

  return chain(function (value) {
    if (isUndefined(value)) {
      return value;
    }

    const isValid = enumTypes.some(function (enumType) {
      try {
        enumType(value);

        return true;
      } catch (e) {
        return false;
      }
    });

    if (isValid) {
      return value;
    }

    throw new TypesError('value is none of the provided enum types');
  });
};

Types.uuid = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    throw new TypesError('value is not a valid UUID');
  }

  const check = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (check.test(value)) {
    return value;
  }

  throw new TypesError('value is not a valid UUID');
});

Types.any = chain(function (value) {
  return value;
});

/**
 * Object
 */
Types.object = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (!isPlainObject(value)) {
    throw new TypesError('value is not an object');
  }

  return value;
});

function validateAndReturnObject(value, schema) {
  return mapValues(schema, (type, k) => {
    try {
      return type(value[k]);
    } catch (e) {
      throw new TypesError('schema failed for key `' + k + '`, ' + e.message);
    }
  });
}

Types.object.of = function (schema) {
  if (!isPlainObject(schema)) {
    throw new TypesError('`object.of` must receive a plain object');
  }

  return chain(function (value) {
    if (isUndefined(value)) {
      return value;
    }

    if (!isPlainObject(value)) {
      throw new TypesError('value is not an object');
    }

    return validateAndReturnObject(value, schema);
  });
};

/**
 * Model
 */
Types.model = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (isModel(value)) {
    return value;
  }

  throw new TypesError('value is not a Model instance');
});

Types.model.of = function (Model) {
  if (typeof Model !== 'function') {
    throw new TypesError('Model is not a function');
  }

  return chain(function (value) {
    if (isUndefined(value)) {
      return value;
    }

    if (isModel(value)) {
      if (value instanceof Model) {
        return value;
      }

      throw new TypesError('value is not instance of expected Model');
    }

    if (isPlainObject(value)) {
      return new Model(value);
    }

    throw new TypesError('value is not an object');
  });
};

/**
 * Collection
 */
Types.collection = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (isCollection(value)) {
    return value;
  }

  throw new TypesError('value is not a Collection instance');
});

Types.collection.of = function (Collection) {
  if (typeof Collection !== 'function') {
    throw new TypesError('Collection is not a function');
  }

  return chain(function (value) {
    if (isUndefined(value)) {
      return value;
    }

    if (isCollection(value)) {
      if (value instanceof Collection) {
        return value;
      }

      throw new TypesError('value is not instance of expected Collection');
    }

    if (isArray(value)) {
      return new Collection(value);
    }

    throw new TypesError('value is not an array');
  });
};

/**
 * Date
 */
Types.date = chain(function (value) {
  if (isUndefined(value)) {
    return value;
  }

  if (!isDate(value)) {
    throw new TypesError('value is not a date');
  }

  return value;
});

export default Types;
