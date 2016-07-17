import BaseError from './Base';

export default class ActionError extends BaseError {
  constructor(...args) {
    super(...args);

    this.name = 'ActionError';
  }
}
