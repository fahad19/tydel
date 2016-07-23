/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';

describe('Collection :: reduce()', function () {
  it('iterates and reduces the collection', function () {
    const Person = createModel({
      age: Types.number.isRequired
    });
    const People = createCollection(Person);

    const people = new People();

    people.push(new Person({ age: 10 }));
    people.push(new Person({ age: 20 }));
    people.push(new Person({ age: 30 }));

    const totalAge = people.reduce((result, model) => {
      return result + model.age;
    }, 0);

    expect(totalAge).to.eql(10 + 20 + 30);
  });
});
