/* global describe, it */
import { expect } from 'chai';
import range from 'lodash/fp/range';

import Types from '../../src/Types';

describe('Types :: date', function () {
  it('accepts undefined unless required', function () {
    const type = Types.date;

    expect(type()).to.be.an('undefined');
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts date values', function () {
    const type = Types.date;

    range(1, 24)
      .map(h => `12/28/1977 ${h}:00:00 EST`)
      .forEach(s => expect(type(new Date(s))).to.eql(new Date(s)));
  });

  it('rejects non-date values', function () {
    const type = Types.date;

    expect(() => type(0)).to.throw(/value is not a date/);
    expect(() => type(null)).to.throw(/value is not a date/);
    expect(() => type(true)).to.throw(/value is not a date/);
    expect(() => type(() => {})).to.throw(/value is not a date/);
  });

  it('checks for required values', function () {
    const type = Types.date.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.date.defaults(new Date('12/28/1977'));

    expect(type()).to.eql(new Date('12/28/1977'));
    expect(() => type(123)).to.throw(/value is not a date/);
  });
});