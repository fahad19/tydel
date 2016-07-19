/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: bool', function () {
  it('accepts undefined unless required', function () {
    const type = Types.bool;

    expect(type()).to.eql(undefined);
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts boolean values', function () {
    const type = Types.bool;

    expect(type(true)).to.eql(true);
    expect(type(false)).to.eql(false);
  });

  it('rejects non-boolean values', function () {
    const type = Types.bool;

    expect(() => type(0)).to.throw(/value is not a boolean/);
    expect(() => type(null)).to.throw(/value is not a boolean/);
    expect(() => type('hello world')).to.throw(/value is not a boolean/);
    expect(() => type(() => {})).to.throw(/value is not a boolean/);
  });

  it('checks for required values', function () {
    const type = Types.bool.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.bool.defaults(true);

    expect(type()).to.eql(true);
    expect(() => type(123)).to.throw(/value is not a boolean/);
  });
});
