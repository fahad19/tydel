/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: any', function () {
  it('accepts any values', function () {
    const type = Types.any;

    expect(type(1)).to.eql(1);
    expect(type('hello')).to.eql('hello');
    expect(type([])).to.eql([]);
    expect(type({})).to.eql({});
  });

  it('checks for required values', function () {
    const type = Types.any.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.any.defaults(123);

    expect(type()).to.eql(123);
    expect(type(234)).to.eql(234);
  });
});
