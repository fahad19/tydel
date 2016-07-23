/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';

describe('Collection :: remove()', function () {
  it('removes specific model from collection', function () {
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
    people.remove(hermione);

    expect(people.length).to.eql(2);

    expect(people.toJS()).to.eql([
      { name: 'Harry' },
      { name: 'Ron' }
    ]);
  });
});
