import _ from 'lodash';

import TypeError from './errors/Type';

export const isRequired = {
  func: function isRequired(value) {
    if (typeof value === 'undefined') {
      throw new TypeError('value is not defined');
    }

    return value;
  }
};

export const defaults = {
  isFactory: true,
  func: function defaults(value, defaultValue) {
    if (value) {
      return value;
    }

    if (_.isFunction(defaultValue)) {
      return defaultValue();
    }
        
    return defaultValue;
  }
};
