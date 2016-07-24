/* eslint-disable */
const ChainableTypes = require('./ChainableTypes');
const chainType = require('./chainType').default;
const createCollection = require('./createCollection').default;
const createModel = require('./createModel').default;
const isCollection = require('./isCollection').default;
const isModel = require('./isModel').default;
const Types = require('./Types').default;
const TypeError = require('./errors/Type').default;
const MethodError = require('./errors/Method').default;
const CollectionError = require('./errors/Collection').default;

module.exports = {
  ChainableTypes,
  chainType,
  createCollection,
  createModel,
  isCollection,
  isModel,
  Types,
  TypeError,
  MethodError,
  CollectionError
};
