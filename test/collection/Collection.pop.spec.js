/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';
import isModel from '../../src/isModel';

describe('Collection :: pop()', function () {
  it('removes last model from collection and returns it', function () {
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

    const lastModel = people.pop();

    expect(people.length).to.eql(2);

    expect(people.toJS()).to.eql([
      { name: 'Harry' },
      { name: 'Hermione' }
    ]);
    expect(lastModel.name).to.eql('Ron');
  });
});
