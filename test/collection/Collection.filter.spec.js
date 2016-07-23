/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';

describe('Collection :: filter()', function () {
  it('filters the collection', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People();

    people.push(new Person({ name: 'Harry' }));
    people.push(new Person({ name: 'Hermione' }));
    people.push(new Person({ name: 'Ron' }));

    const modelsWithH = people.filter((person) => {
      return person.name.startsWith('H');
    });

    expect(modelsWithH.length).to.eql(2);
    expect(modelsWithH[0].name).to.eql('Harry');
    expect(modelsWithH[1].name).to.eql('Hermione');
  });
});
