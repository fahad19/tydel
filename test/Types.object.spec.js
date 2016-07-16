/* global describe, it */
import { expect } from 'chai';

import Types from '../src/Types';

describe('Types :: object', function () {
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
});
