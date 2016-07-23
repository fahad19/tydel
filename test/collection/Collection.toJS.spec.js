/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';
import isModel from '../../src/isModel';

describe('Collection :: toJS()', function () {
  it('converts to plain array of plain objects', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People([
      { name: 'Harry' },
      { name: 'Hermione' },
      { name: 'Ron' }
    ]);

    expect(isModel(people.at(0))).to.eql(true);
    expect(isModel(people.at(1))).to.eql(true);
    expect(isModel(people.at(2))).to.eql(true);

    expect(people.toJS()).to.eql([
      { name: 'Harry' },
      { name: 'Hermione' },
      { name: 'Ron' }
    ]);
  });
});
