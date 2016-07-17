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

  it('creates Model class with nested types', function () {
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

    function changeStreet() {
      model.address.street = 'something else';
    }

    expect(changeStreet).to.throw(/Cannot set property/);

    function changeAddress() {
      model.address = {};
    }

    expect(changeAddress).to.throw(/Cannot set property/);
  });

  it('creates Model class with actions', function () {
    const Model = createModel({
      name: Types.string.isRequired
    }, {
      getName() {
        return this.name;
      },
      setName(name) {
        this.name = name;
      }
    });

    const model = new Model({
      name: 'Fahad'
    });

    expect(model).to.be.instanceof(Model);
    expect(model.name).to.eql('Fahad');
    expect(model.setName).to.be.a('function');

    expect(model.getName()).to.eql('Fahad');

    model.setName('Heylaal');
    expect(model.name).to.eql('Heylaal');
  });

  it('allows actions to call other actions', function () {
    const Model = createModel({
      firstName: Types.string.isRequired,
      lastName: Types.string.isRequired
    }, {
      // first
      getFirstName() {
        return this.firstName;
      },
      setFirstName(firstName) {
        this.firstName = firstName;
      },

      // last
      getLastName() {
        return this.lastName;
      },
      setLastName(lastName) {
        this.lastName = lastName;
      },

      // full
      getFullName() {
        return this.getFirstName() + ' ' + this.getLastName();
      },
      setFullName(firstName, lastName) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
      }
    });

    const model = new Model({
      firstName: 'Fahad',
      lastName: 'Heylaal'
    });

    expect(model).to.be.instanceof(Model);
    expect(model.firstName).to.eql('Fahad');
    expect(model.lastName).to.eql('Heylaal');

    expect(model.getFirstName).to.be.a('function');
    expect(model.getFirstName()).to.eql('Fahad');

    expect(model.getLastName).to.be.a('function');
    expect(model.getLastName()).to.eql('Heylaal');

    expect(model.getFullName()).to.eql('Fahad Heylaal');

    model.setFirstName('John');
    model.setLastName('Smith');
    expect(model.getFullName()).to.eql('John Smith');

    model.setFullName('Foo', 'Bar');
    expect(model.getFullName()).to.eql('Foo Bar');
  });

  it('embeds other models', function () {
    const Address = createModel({
      street: Types.string,
      country: Types.string
    }, {
      getStreet() {
        return this.street;
      },
      setStreet(street) {
        this.street = street;
      }
    });

    const Person = createModel({
      name: Types.string.isRequired,
      address: Types.model.of(Address)
    }, {
      getName() {
        return this.name;
      },
      getStreet() {
        return this.address.getStreet();
      }
    });

    const person = new Person({
      name: 'Fahad',
      address: {
        street: 'Straat',
        country: 'Netherlands'
      }
    });

    expect(person).to.be.instanceof(Person);
    expect(person.address).to.be.instanceof(Address);

    expect(person.name).to.eql('Fahad');
    expect(person.address.street).to.eql('Straat');
    expect(person.address.country).to.eql('Netherlands');
  });
});
