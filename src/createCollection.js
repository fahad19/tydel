import _ from 'lodash';

import ActionError from './errors/Action';
import CollectionError from './errors/Collection';
import isModel from './isModel';

const reservedActions = [
  'toJS'
];

export default function createCollection(Model, actions) {
  const actionKeys = _.keys(actions);
  const commonKeys = _.intersection(reservedActions, actionKeys);

  if (commonKeys.length > 0) {
    const commonKeysList = commonKeys
      .map(item => '`' + item + '`')
      .join(', ');

    throw new ActionError('conflicting action with reserved names: ' + commonKeysList);
  }

  const models = [];

  function Collection(givenModels = []) {
    givenModels.forEach((v) => {
      if (isModel(v)) {
        this.push(v);

        return;
      }

      const model = new Model(v);
      this.push(model);
    });
  }

  Collection.prototype.at = function (n) {
    return models[n];
  };

  Collection.prototype.push = function (model) {
    if (!isModel(model)) {
      throw new CollectionError('not a valid Model instance is being pushed');
    }

    if (!(model instanceof Model)) {
      throw new CollectionError('Model instance is not of the one Collection is expecting');
    }

    return models.push(model);
  };

  Collection.prototype.forEach = function (fn) {
    return models.forEach(fn.bind(this));
  };

  Collection.prototype.map = function (fn) {
    return models.map(fn.bind(this));
  };

  Collection.prototype.reduce = function (fn) {
    return models.reduce(fn.bind(this));
  };

  Collection.prototype.pop = function () {
    return models.pop();
  };

  Collection.prototype.shift = function () {
    return models.shift();
  };

  Collection.prototype.unshift = function (model) {

  };

  Collection.prototype.remove = function (model) {

  };

  Collection.prototype.toJS = function () {
    return models.map((model) => {
      return model.toJS();
    });
  };

  return Collection;
}
