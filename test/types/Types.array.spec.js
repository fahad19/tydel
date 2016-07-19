/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: array', function () {
  it('accepts undefined unless required', function () {
    const type = Types.array;

    expect(type()).to.eql(undefined);
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts array values', function () {
    const type = Types.array;

    expect(type([])).to.eql([]);
    expect(type([1, 2, 3])).to.eql([1, 2, 3]);
  });

  it('rejects non-array values', function () {
    const type = Types.array;

    expect(() => type(0)).to.throw(/value is not an array/);
    expect(() => type(null)).to.throw(/value is not an array/);
    expect(() => type(true)).to.throw(/value is not an array/);
    expect(() => type({})).to.throw(/value is not an array/);
    expect(() => type(() => {})).to.throw(/value is not an array/);
  });

  it('checks for required values', function () {
    const type = Types.array.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.array.defaults(['hi', 'there']);

    expect(type()).to.eql(['hi', 'there']);
    expect(type([1, 2, 3])).to.eql([1, 2, 3]);
    expect(() => type(123)).to.throw(/value is not an array/);
  });
});
