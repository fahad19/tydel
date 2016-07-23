/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';

describe('Collection :: findIndex()', function () {
  it('finds index of the model in collection', function () {
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

    const hermione = people.at(1);
    const index = people.findIndex(hermione);

    expect(index).to.eql(1);
  });
});
