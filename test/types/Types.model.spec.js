/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';

describe('Types :: model', function () {
  it('accepts undefined unless required', function () {
    const type = Types.model;

    expect(type()).to.be.an('undefined');
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts model instances', function () {
    const type = Types.model;
    const Person = createModel({
      name: Types.string.isRequired
    });

    const person = new Person({ name: 'Fahad' });

    expect(type(person)).to.eql(person);
  });

  it('rejects non-model values', function () {
    const type = Types.model;

    expect(() => type('hello')).to.throw(/value is not a Model/);
    expect(() => type(null)).to.throw(/value is not a Model/);
    expect(() => type(true)).to.throw(/value is not a Model/);
    expect(() => type({})).to.throw(/value is not a Model/);
    expect(() => type(() => {})).to.throw(/value is not a Model/);
  });

  it('checks for required values', function () {
    const type = Types.model.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });

    const person = new Person({ name: 'Fahad' });
    const type = Types.model.defaults(person);

    expect(type()).to.eql(person);

    const anotherPerson = new Person({ name: 'Dark Lord' });
    expect(type(anotherPerson)).to.eql(anotherPerson);
    expect(() => type('hello world')).to.throw(/value is not a Model/);
  });

  it('accepts model instances of certain Model', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const Post = createModel({
      title: Types.string.isRequired
    });

    const type = Types.model.of(Person);

    const person = new Person({ name: 'Fahad' });
    expect(type(person)).to.eql(person);
    expect(type({ name: 'Name here' })).to.be.instanceof(Person);

    const post = new Post({ title: 'Hello World' });
    expect(() => type(post)).to.throw(/value is not instance of expected Model/);
  });
});
