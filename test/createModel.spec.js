/* global describe, it */
import { expect } from 'chai';

import Types from '../src/Types';
import createModel from '../src/createModel';
import createCollection from '../src/createCollection';
import isModel from '../src/isModel';
import isCollection from '../src/isCollection';

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

  it('throws error when action name conflicts', function () {
    const Person = createModel({
      name: Types.string,
      bio: Types.string
    }, {
      name() {
        return true;
      }
    });

    function getPerson() {
      new Person({  // eslint-disable-line
        name: 'Fahad',
        bio: 'blah...'
      });
    }

    expect(getPerson).to.throw(/conflicting action: name/);
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
    expect(isModel(person.address)).to.eql(true);

    expect(person.name).to.eql('Fahad');
    expect(person.address.street).to.eql('Straat');
    expect(person.address.country).to.eql('Netherlands');
  });

  it('checks for types on re-assignments', function () {
    const Person = createModel({
      name: Types.string.isRequired
    }, {
      setName(name) {
        this.name = name;
      }
    });

    const person = new Person({
      name: 'Fahad'
    });

    expect(person.name).to.eql('Fahad');

    person.setName('Fahad [updated]');
    expect(person.name).to.eql('Fahad [updated]');

    function changeName() {
      person.setName(123);
    }

    expect(changeName).to.throw(/value is not a string/);
    expect(person.name).to.eql('Fahad [updated]');
  });

  it('checks with multiple model instances', function () {
    const Person = createModel({
      name: Types.string.isRequired
    });

    const harry = new Person({ name: 'Harry' });
    const hermione = new Person({ name: 'Hermione' });
    const ron = new Person({ name: 'Ron' });

    expect(harry.name).to.eql('Harry');
    expect(hermione.name).to.eql('Hermione');
    expect(ron.name).to.eql('Ron');
  });

  it('embeds collections', function () {
    const Post = createModel({
      title: Types.string.isRequired
    }, {
      setTitle(newTitle) {
        this.title = newTitle;
      }
    });

    const Posts = createCollection(Post);

    const Author = createModel({
      name: Types.string.isRequired,
      posts: Types.collection.of(Posts)
    });

    const author = new Author({
      name: 'Fahad',
      posts: [
        { title: 'Hello World' },
        { title: 'About' },
        { title: 'Contact' }
      ]
    });

    expect(author.name).to.eql('Fahad');
    expect(isCollection(author.posts)).to.eql(true);

    expect(isModel(author.posts.at(0)));
    expect(author.posts.at(0).title).to.eql('Hello World');

    expect(isModel(author.posts.at(1)));
    expect(author.posts.at(1).title).to.eql('About');

    expect(isModel(author.posts.at(2)));
    expect(author.posts.at(2).title).to.eql('Contact');

    const about = author.posts.at(1);
    about.setTitle('About Us');

    expect(about.title).to.eql('About Us');
    expect(author.posts.at(1).title).to.eql('About Us');
  });
});
