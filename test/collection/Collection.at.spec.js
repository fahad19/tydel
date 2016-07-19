/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';

describe('Collection :: at()', function () {
  it('finds model by index', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People([
      { name: 'Harry' },
      { name: 'Hermione' },
      { name: 'Ron' }
    ]);

    expect(people.at(0).name).to.eql('Harry');
    expect(people.at(1).name).to.eql('Hermione');
    expect(people.at(2).name).to.eql('Ron');
  });
});
