import _ from 'lodash';

import ActionError from './errors/Action';
import CollectionError from './errors/Collection';
import isModel from './isModel';

// @TODO: add more to the list
const reservedActions = [
  'toJS'
];

export default function createCollection(Model, actions = {}) {
  const actionKeys = _.keys(actions);
  const commonKeys = _.intersection(reservedActions, actionKeys);

  if (commonKeys.length > 0) {
    const commonKeysList = commonKeys
      .map(item => '`' + item + '`')
      .join(', ');

    throw new ActionError('conflicting action with reserved names: ' + commonKeysList);
  }

  function Collection(givenModels = []) {
    const models = [];

    // @TODO: make actions

    // reserved build-in methods
    this.at = function (n) {
      return models[n];
    };

    this.push = function (model) {
      if (!isModel(model)) {
        throw new CollectionError('not a valid Model instance is being pushed');
      }

      if (!(model instanceof Model)) {
        throw new CollectionError('Model instance is not of the one Collection is expecting');
      }

      return models.push(model);
    };

    this.forEach = function (fn) {
      return models.forEach(fn.bind(this));
    };

    this.map = function (fn) {
      return models.map(fn.bind(this));
    };

    this.reduce = function (fn) {
      return models.reduce(fn.bind(this));
    };

    this.pop = function () {
      return models.pop();
    };

    this.shift = function () {
      return models.shift();
    };

    this.unshift = function (model) {

    };

    this.remove = function (model) {

    };

    this.toJS = function () {
      return models.map((model) => {
        return model.toJS();
      });
    };

    // initialize
    givenModels.forEach((v) => {
      if (isModel(v)) {
        this.push(v);

        return;
      }

      const model = new Model(v);
      this.push(model);
    });
  }

  return Collection;
}
