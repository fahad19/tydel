/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: func', function () {
  it('accepts function values', function () {
    const type = Types.func;

    const fn = () => {};
    expect(type(fn)).to.eql(fn);
  });

  it('rejects non-function values', function () {
    const type = Types.func;

    expect(() => type(0)).to.throw(/value is not a function/);
    expect(() => type(null)).to.throw(/value is not a function/);
    expect(() => type('hello world')).to.throw(/value is not a function/);
    expect(() => type({})).to.throw(/value is not a function/);
    expect(() => type([])).to.throw(/value is not a function/);
  });

  it('checks for required values', function () {
    const type = Types.func.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const defaultFunc = () => {};
    const type = Types.func.defaults(defaultFunc);

    expect(type()).to.eql(defaultFunc);
    expect(() => type(123)).to.throw(/value is not a function/);
  });
});
