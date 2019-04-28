import get from 'lodash/get';

export default function isPromise(promise) {
  return get(promise, ['constructor', 'name']) === 'Promise';
}
