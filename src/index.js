/* eslint-disable */
const ChainableTypes = require('./ChainableTypes').default;
const chainType = require('./chainType').default;
const createCollection = require('./createCollection').default;
const createModel = require('./createModel').default;
const isCollection = require('./isCollection').default;
const isModel = require('./isModel').default;
const Types = rquire('./Types').default;
const TypeError = require('./errors/TypeError').default;
const MethodError = require('./errors/MethodError').default;
const CollectionError = require('./errors/CollectionError').default;

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
