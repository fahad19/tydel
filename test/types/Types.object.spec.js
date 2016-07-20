/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: object', function () {
  it('accepts undefined unless required', function () {
    const type = Types.object;

    expect(type()).to.be.an('undefined');
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts object values', function () {
    const type = Types.object;

    expect(type({})).to.eql({});
    expect(type({a: 1, b: 2})).to.eql({a: 1, b: 2});
  });

  it('rejects non-object values', function () {
    const type = Types.object;

    expect(() => type(0)).to.throw(/value is not an object/);
    expect(() => type(null)).to.throw(/value is not an object/);
    expect(() => type(true)).to.throw(/value is not an object/);
    expect(() => type([])).to.throw(/value is not an object/);
    expect(() => type(() => {})).to.throw(/value is not an object/);
  });

  it('checks for required values', function () {
    const type = Types.object.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.object.defaults({hi: 'there'});

    expect(type()).to.eql({hi: 'there'});
    expect(type({hello: 'world'})).to.eql({hello: 'world'});
    expect(() => type(123)).to.throw(/value is not an object/);
  });

  it('checks for nested types', function () {
    const type = Types.object.of({
      street: Types.string,
      city: Types.string.isRequired,
      postalCode: Types.number.isRequired,
      country: Types.string.defaults('Netherlands')
    });

    expect(type({
      street: 'Amsterdam',
      city: 'Amsterdam',
      postalCode: 123
    })).to.eql({
      street: 'Amsterdam',
      city: 'Amsterdam',
      postalCode: 123,
      country: 'Netherlands'
    });

    expect(() => type({
      street: 'Amsterdam',
      city: 'Amsterdam',
      postalCode: '123'
    })).to.throw(/schema failed for key `postalCode`, value is not a number/);
  });

  it('checks for deep-nested types', function () {
    const type = Types.object.of({
      name: Types.string.isRequired,
      address: Types.object.of({
        street: Types.string,
        city: Types.string.isRequired,
        postalCode: Types.number.isRequired,
        country: Types.string.defaults('Netherlands')
      }).isRequired
    });

    expect(type({
      name: 'Fahad',
      address: {
        street: 'Amsterdam',
        city: 'Amsterdam',
        postalCode: 123
      }
    })).to.eql({
      name: 'Fahad',
      address: {
        street: 'Amsterdam',
        city: 'Amsterdam',
        postalCode: 123,
        country: 'Netherlands'
      }
    });

    expect(() => type({
      name: 'Fahad',
      address: {
        street: 'Amsterdam',
        city: 'Amsterdam',
        postalCode: '123'
      }
    })).to.throw(/schema failed for key `postalCode`, value is not a number/);
  });
});
