import {ClientInputSession} from '../types';
import {DateTime} from 'luxon';

export const sessionDatesValidity = (sessions: ClientInputSession[]): boolean => {
  let validity: boolean = true;
  sessions.forEach((session) => {
    const dt = DateTime.fromISO(session.dateTime ?? "");
    const isPast: boolean = DateTime.local() >= dt;
    validity = validity && (dt.isValid && !isPast);
  });
  return validity;
};
