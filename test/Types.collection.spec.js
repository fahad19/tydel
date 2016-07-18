/* global describe, it */
import { expect } from 'chai';

import Types from '../src/Types';
import createModel from '../src/createModel';
import createCollection from '../src/createCollection';

describe('Types :: collection', function () {
  it('accepts collection instances', function () {
    const type = Types.collection;

    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People([{ name: 'Fahad' }]);

    expect(type(people)).to.eql(people);
  });

  it('rejects non-collection values', function () {
    const type = Types.collection;

    expect(() => type('hello')).to.throw(/value is not a Collection/);
    expect(() => type(null)).to.throw(/value is not a Collection/);
    expect(() => type(true)).to.throw(/value is not a Collection/);
    expect(() => type({})).to.throw(/value is not a Collection/);
    expect(() => type(() => {})).to.throw(/value is not a Collection/);
  });

  it('checks for required values', function () {
    const type = Types.collection.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const people = new People([{ name: 'Fahad' }]);
    const type = Types.collection.defaults(people);

    expect(type()).to.eql(people);

    const otherPeople = new People([{ name: 'Dark Lord' }]);
    expect(type(otherPeople)).to.eql(otherPeople);
    expect(() => type('hello world')).to.throw(/value is not a Collection/);
  });

  it('accepts collection instances of certain Colelction', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });
    const People = createCollection(Person);

    const type = Types.collection.of(People);
    const people = new People([{ name: 'Fahad' }]);

    expect(type(people)).to.eql(people);
    expect(type([{ name: 'Name here' }])).to.be.instanceof(People);

    const Post = createModel({
      title: Types.string.isRequired
    });
    const Posts = createCollection(Post);

    const posts = new Posts([{ title: 'Hello World' }]);
    expect(() => type(posts)).to.throw(/value is not instance of expected Collection/);
  });
});
