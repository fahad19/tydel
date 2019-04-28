import trim from 'lodash/fp/trim';
import result from 'lodash/fp/result';
import flowRight from 'lodash/fp/flowRight';

// https://jsperf.com/date-utc-iso

const dateValue = v => new Date(v);

const getYear = result('getUTCFullYear')
const getMonth = result('getUTCMonth')
const getDay = result('getUTCDate')
const ISODate = result('toISOString')
const UTCDate = result('toUTCString')

/**
 * toUTC
 * @param {Date} date the date to store.
 *
 * @return {number}  A number representing the number of milliseconds for the given date since January 1, 1970, 00:00:00, UTC.
 */
const toUTC = date => Date.UTC(getYear(date), getMonth(date), getDay(date), 0, 0, 0, 0);

/**
 * toDate
 * @param {*} s Maybe Date
 *
 * @return {string}  A string representing the date part of the ISO string
 */
const toDate = flowRight([trim, s => s.slice(0, 10)]);

export default flowRight([
  toDate,
  ISODate,
  dateValue,
  toUTC,
]);
