/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: number', function () {
  it('accepts undefined unless required', function () {
    const type = Types.number;

    expect(type()).to.eql(undefined);
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts number values', function () {
    const type = Types.number;

    expect(type(123)).to.eql(123);
    expect(type(0)).to.eql(0);
  });

  it('rejects non-number values', function () {
    const type = Types.number;

    expect(() => type('hello')).to.throw(/value is not a number/);
    expect(() => type(null)).to.throw(/value is not a number/);
    expect(() => type(true)).to.throw(/value is not a number/);
    expect(() => type(() => {})).to.throw(/value is not a number/);
  });

  it('checks for required values', function () {
    const type = Types.number.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.number.defaults(123);

    expect(type()).to.eql(123);
    expect(type(345)).to.eql(345);
    expect(() => type('hello world')).to.throw(/value is not a number/);
  });
});
