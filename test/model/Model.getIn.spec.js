/* global describe, it */
/* eslint-disable quotes */
import { expect } from 'chai';

import Types from '../../src/Types';
import createModel from '../../src/createModel';
import createCollection from '../../src/createCollection';
import isModel from '../../src/isModel';

describe('Model :: getIn()', function () {
  it('gets value by path from self', function () {
    const Person = createModel({
      name: Types.string
    });

    const person = new Person({ name: 'Newt Scamander' });

    expect(person.getIn(['name'])).to.eql('Newt Scamander');
  });

  it('gets value by path from child-model', function () {
    const Address = createModel({
      street: Types.string,
      city: Types.string
    }, {
      setStreet(street) {
        this.street = street;
      }
    });

    const Person = createModel({
      name: Types.string.isRequired,
      address: Types.model.of(Address)
    });

    const person = new Person({
      name: 'Vernon Dursley',
      address: {
        street: 'Privet Drive',
        city: 'Surrey'
      }
    });

    expect(isModel(person.getIn(['address']))).to.eql(true);
    expect(person.getIn(['address'])).to.eql(person.address);
    expect(person.getIn(['address', 'city'])).to.eql('Surrey');
  });

  it('gets value by path from child-collection', function () {
    const Book = createModel({
      title: Types.string.isRequired
    }, {
      setTitle(title) {
        this.title = title;
      }
    });

    const Books = createCollection(Book);

    const Author = createModel({
      name: Types.string.isRequired,
      books: Types.collection.of(Books)
    });

    const author = new Author({
      name: 'Rita Skeeter',
      books: [
        { title: 'The Life and Lies of Dumbledore' },
        { title: `Dumbledore's Army` }
      ]
    });

    expect(author.getIn(['books'])).to.eql(author.books);
    expect(author.getIn(['books', 0])).to.eql(author.books.at(0));
    expect(author.getIn(['books', 0, 'title'])).to.eql('The Life and Lies of Dumbledore');
    expect(author.getIn(['books', 1])).to.eql(author.books.at(1));
    expect(author.getIn(['books', 1, 'title'])).to.eql(`Dumbledore's Army`);
  });
});
