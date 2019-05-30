import React from 'react';
import { dateFormatter, truncate } from '../src/helper/formatMeetup';
import formatServerError from '../src/helper/formatServerResponse';

describe('format meetup helpers', () => {
  it('should format meetup date', () => {
    expect(dateFormatter('2019-05-31T00:43:30.722Z')).toEqual('31T00:43:30.722Z / May / 2019');
  });

  it('should truncate the test', () => {
    expect(truncate('this is it', 2)).toEqual('t...');
  });

  it('should truncate the test', () => {
    expect(truncate('this is it', 20)).toEqual('this is it');
  });
});

describe('format server error', () => {
  it('should format an error', () => {
    expect(formatServerError('error')).toEqual([<li>error</li>]);
  });
});
