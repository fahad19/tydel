import * as ChainableTypes from './ChainableTypes';
import chainType from './chainType';
import createCollection from './createCollection';
import createModel from './createModel';
import isCollection from './isCollection';
import isModel from './isModel';
import isEvent from './isEvent';
import Event from './base/Event';
import Types from './Types';
import TypeError from './errors/Type';
import MethodError from './errors/Method';
import CollectionError from './errors/Collection';

module.exports = {
  // Type
  ChainableTypes,
  chainType,
  Types,
  TypeError,

  // Collection
  createCollection,
  isCollection,
  CollectionError,

  // Model
  createModel,
  isModel,

  // Event
  Event,
  isEvent,

  MethodError,
};
