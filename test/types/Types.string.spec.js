/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: string', function () {
  it('accepts undefined unless required', function () {
    const type = Types.string;

    expect(type()).to.be.an('undefined');
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts string values', function () {
    const type = Types.string;

    expect(type('hello')).to.eql('hello');
    expect(type('hello world')).to.eql('hello world');
    expect(type('')).to.eql('');
  });

  it('rejects non-string values', function () {
    const type = Types.string;

    expect(() => type(0)).to.throw(/value is not a string/);
    expect(() => type(null)).to.throw(/value is not a string/);
    expect(() => type(true)).to.throw(/value is not a string/);
    expect(() => type(() => {})).to.throw(/value is not a string/);
  });

  it('checks for required values', function () {
    const type = Types.string.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.string.defaults('hello');

    expect(type()).to.eql('hello');
    expect(type('something')).to.eql('something');
    expect(() => type(123)).to.throw(/value is not a string/);
  });
});
