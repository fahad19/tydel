/* global describe, it */
import { expect } from 'chai';

import Types from '../src/Types';
import createModel from '../src/createModel';
import createCollection from '../src/createCollection';
import isModel from '../src/isModel';
import isCollection from '../src/isCollection';

describe('createCollection', function () {
  it('creates Collection class', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People();
    expect(people).to.be.instanceof(People);
  });

  it('creates Collection with Model', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People([
      { name: 'Harry' },
      // new Person({ name: 'Hermione' }),
      { name: 'Hermione' },
      { name: 'Ron' }
    ]);

    expect(people).to.be.instanceof(People);
    expect(isCollection(people)).to.eql(true);

    // first
    expect(isModel(people.at(0))).to.eql(true);
    expect(people.at(0).name).to.eql('Harry');

    // second
    expect(isModel(people.at(1))).to.eql(true);
    expect(people.at(1).name).to.eql('Hermione');

    // third
    expect(isModel(people.at(2))).to.eql(true);
    expect(people.at(2).name).to.eql('Ron');
  });
});
