/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';

describe('Collection :: unshift()', function () {
  it('prepends model at the beginning of the collection', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People();

    people.push(new Person({ name: 'Harry' }));
    people.push(new Person({ name: 'Hermione' }));

    people.unshift(new Person({ name: 'Ron' }));

    expect(people.at(0).name).to.eql('Ron');
    expect(people.at(1).name).to.eql('Harry');
    expect(people.at(2).name).to.eql('Hermione');
  });
});
