/* global describe, it */
import { expect } from 'chai';

import Types from '../src/Types';

describe('Types :: enum', function () {
  it('accepts enum values', function () {
    const type = Types.enum([1, 2, 3]);

    expect(type(1)).to.eql(1);
    expect(type(2)).to.eql(2);
    expect(type(3)).to.eql(3);
  });

  it('rejects non-enum values', function () {
    const type = Types.enum([1, 2, 3]);

    expect(() => type(0)).to.throw(/value is none of the provided enums/);
    expect(() => type(null)).to.throw(/value is none of the provided enums/);
    expect(() => type(true)).to.throw(/value is none of the provided enums/);
    expect(() => type(() => {})).to.throw(/value is none of the provided enums/);
    expect(() => type('hello')).to.throw(/value is none of the provided enums/);
  });

  it('checks for required values', function () {
    const type = Types.enum([1, 2, 3]).isRequired;

    expect(() => type()).to.throw(/value is not defined/);
    expect(type(1)).to.eql(1);
  });

  it('allows empty values when default is set', function () {
    const type = Types.enum([1, 2, 3]).defaults(2);

    expect(type()).to.eql(2);
    expect(type(3)).to.eql(3);
    expect(() => type('hello world')).to.throw(/value is none of the provided enums/);
  });

  it('accepts enum of types', function () {
    const type = Types.enum.of([
      Types.string,
      Types.number
    ]).isRequired;

    expect(type(1)).to.eql(1);
    expect(type(2)).to.eql(2);
    expect(type('hi')).to.eql('hi');
    expect(() => type({})).to.throw('value is none of the provided enum types');
  });
});
