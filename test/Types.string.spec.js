/* global describe, it */
import { expect } from 'chai';

import * as Types from '../src/Types';

describe('Types :: string', function () {
  it('accepts string values', function () {
    const type = Types.string;

    expect(type('hello')).to.eql(true);
    expect(type('hello world')).to.eql(true);
    expect(type('')).to.eql(true);
  });

  it('rejects non-string values', function () {
    const type = Types.string;

    expect(type(0)).to.eql(false);
    expect(type(null)).to.eql(false);
    expect(type(true)).to.eql(false);
    expect(type(() => {})).to.eql(false);
  });

  it('checks for required values', function () {
    const type = Types.string.isRequired;

    expect(type()).to.eql(false);
  });

  it('allows empty values when default is set', function () {
    const type = Types.string.defaults('hello');

    expect(type()).to.eql(true);
    expect(type('something')).to.eql(true);
    expect(type(123)).to.eql(false);
  });
});
