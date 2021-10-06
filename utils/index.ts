import {ClientInputSession} from '../types';
import {DateTime} from 'luxon';

export const sessionDatesValidity = (sessions: ClientInputSession[]): boolean => {
  let validity: boolean = true;
  sessions.forEach((session) => {
    const dt = DateTime.fromObject({
      month: session.month,
      day: session.date,
      year: session.year,
      hour: session.time![0] || 0,
      minute: session.time![1] || 0,
    });
    const isPast: boolean = DateTime.local() > dt;
    console.log('valide?', dt.isValid);
    console.log('ispast?', isPast);
    validity = validity && (dt.isValid && !isPast);
  });
  return validity;
};
