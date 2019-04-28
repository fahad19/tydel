import _ from 'lodash';

export default function isPromise(promise) {
  return _.get(promise, ['constructor', 'name']) === 'Promise';
}
