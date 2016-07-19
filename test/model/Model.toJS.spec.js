/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import isModel from '../../src/isModel';

describe('Model :: toJS()', function () {
  it('converts simple Model\'s attributes to plain object', function () {
    const Model = createModel({
      name: Types.string.isRequired
    });
    const model = new Model({
      name: 'Blah'
    });

    expect(model.toJS()).to.eql({ name: 'Blah' });
  });

  it('converts nested Model\'s attributes to plain object', function () {
    const Address = createModel({
      street: Types.string.isRequired
    });

    const Person = createModel({
      name: Types.string.isRequired,
      address: Types.model.of(Address)
    });

    const person = new Person({
      name: 'Blah',
      address: {
        street: 'Straat'
      }
    });

    expect(isModel(person.address)).to.eql(true);

    expect(person.toJS()).to.eql({
      name: 'Blah',
      address: {
        street: 'Straat'
      }
    });
  });
});
