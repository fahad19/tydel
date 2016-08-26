/* global describe, it */
import { expect } from 'chai';

import Types from '../../src/Types';

describe('Types :: uuid', function () {
  it('accepts undefined unless required', function () {
    const type = Types.uuid;

    expect(type()).to.be.an('undefined');
    expect(() => type.isRequired()).to.throw('value is not defined');
  });

  it('accepts UUIDs values', function () {
    const type = Types.uuid;

    expect(type('27961a0e-f4e8-4eb3-bf95-c5203e1d87b9')).to.eql('27961a0e-f4e8-4eb3-bf95-c5203e1d87b9');
    expect(type('90691cbc-b5ea-5826-ae98-951e30fc3b2d')).to.eql('90691cbc-b5ea-5826-ae98-951e30fc3b2d');
  });

  it('rejects non-UUID values', function () {
    const type = Types.uuid;

    expect(() => type('hello')).to.throw(/value is not a valid UUID/);
    expect(() => type(null)).to.throw(/value is not a valid UUID/);
    expect(() => type(true)).to.throw(/value is not a valid UUID/);
    expect(() => type(() => {})).to.throw(/value is not a valid UUID/);
  });

  it('checks for required values', function () {
    const type = Types.uuid.isRequired;

    expect(() => type()).to.throw(/value is not defined/);
  });

  it('allows empty values when default is set', function () {
    const type = Types.uuid.defaults('90691cbc-b5ea-5826-ae98-951e30fc3b2d');

    expect(type()).to.eql('90691cbc-b5ea-5826-ae98-951e30fc3b2d');
    expect(type('27961a0e-f4e8-4eb3-bf95-c5203e1d87b9')).to.eql('27961a0e-f4e8-4eb3-bf95-c5203e1d87b9');
    expect(() => type('hello world')).to.throw(/value is not a valid UUID/);
  });
});
