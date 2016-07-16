/* global describe, it */
import { expect } from 'chai';

import Types from '../src/Types';
import createModel from '../src/createModel';

describe('createModel', function () {
  it('creates Model class', function () {
    const Model = createModel();
    const model = new Model();

    expect(model).to.be.instanceof(Model);
  });

  it('creates Model class with types', function () {
    const Model = createModel({
      name: Types.string.isRequired,
      language: Types.string.defaults('English')
    });

    const model = new Model({
      name: 'Fahad'
    });

    expect(model).to.be.instanceof(Model);
    expect(model.name).to.eql('Fahad');
    expect(model.language).to.eql('English');
  });

  it('disables instance property mutations', function () {
    const Model = createModel({
      name: Types.string.isRequired,
      language: Types.string.defaults('English')
    });

    const model = new Model({
      name: 'Fahad'
    });

    expect(model).to.be.instanceof(Model);
    expect(model.name).to.eql('Fahad');

    function changeName() {
      model.name = 'Some other name';
    }

    expect(changeName).to.throw(/Cannot set property name/);
  });

  it.only('creates Model class with nested types', function () {
    const Model = createModel({
      name: Types.string.isRequired,
      address: Types.object.of({
        street: Types.string,
        city: Types.string
      })
    });

    const model = new Model({
      name: 'Fahad',
      address: {
        street: 'Straat',
        city: 'Amsterdam'
      }
    });

    expect(model).to.be.instanceof(Model);
    expect(model.name).to.eql('Fahad');
    expect(model.address.street).to.eql('Straat');
    expect(model.address.city).to.eql('Amsterdam');
    expect(model.address).to.eql({
      street: 'Straat',
      city: 'Amsterdam'
    });

    // function changeStreet() {
    //   model.address.street = 'something else';
    // }

    // expect(changeStreet).to.throw(/Cannot set property name/);
  });
});
