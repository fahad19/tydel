/* global describe, it */
import { expect } from 'chai';

import Types from '../src/Types';
import createModel from '../src/createModel';
import createCollection from '../src/createCollection';
import isCollection from '../src/isCollection';

describe('isCollection', function () {
  it('returns true when object is a valid Collection instance', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People([]);

    expect(isCollection(people)).to.eql(true);
  });

  it('returns false when object is NOT a collection', function () {
    expect(isCollection(123)).to.eql(false);
    expect(isCollection('hi')).to.eql(false);
    expect(isCollection({})).to.eql(false);
    expect(isCollection([])).to.eql(false);
    expect(isCollection(() => {})).to.eql(false);
  });
});
