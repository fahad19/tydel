/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';
import isModel from '../../src/isModel';

describe('Collection :: find()', function () {
  it('finds single model from collection', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People([
      { name: 'Harry' },
      { name: 'Hermione' },
      { name: 'Ron' }
    ]);

    expect(people.length).to.eql(3);

    const hermione = people.find(function (person) {
      return person.name === 'Hermione';
    });

    expect(hermione.name).to.eql('Hermione');
  });
});
