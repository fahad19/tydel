/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';

describe('Collection :: map()', function () {
  it('iterates and maps the collection', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People();

    people.push(new Person({ name: 'Harry' }));
    people.push(new Person({ name: 'Hermione' }));
    people.push(new Person({ name: 'Ron' }));

    const names = people.map((person) => {
      return person.name;
    });

    expect(names).to.eql([
      'Harry',
      'Hermione',
      'Ron'
    ]);
  });
});
