import {NextApiRequest, NextApiResponse} from 'next';
import type {ClientInputSession, ClientInputEvent, ServerEvent} from '../../types';
import {serverUrl, gCalendar as gcalCalendar, slackChannel} from '../../utils';
import {DateTime} from 'luxon';

const prepareEventPayload = (event: ClientInputEvent, sessions: ClientInputSession[]): ServerEvent[] => {
  const payload: ServerEvent[] = [];
  for (const s of sessions) {
    const startDateTime = DateTime.fromObject({
      day: s.date,
      year: s.year,
      month: s.month,
      hour: s.time![0],
      minute: s.time![1],
    }, {
      zone: event.timezone,
    });
    const endDateTime = startDateTime.plus({
      hours: 1, minutes: 30,
    });
    payload.push({
      title: event.title!,
      descriptionText: event.descriptionText!,
      descriptionHtml: event.descriptionHtml!,
      location: event.location!,
      series: sessions.length > 1 ? true : false,
      proposerEmail: event.proposerEmail!,
      proposerName: event.proposerName!,
      startDateTime: startDateTime.toISO(),
      endDateTime: endDateTime.toISO(),
      limit: 0,
      postOnSlack: true,
      slackChannel,
      createGcalEvent: true,
      gcalCalendar,
      typeId: event.eventType!,
    });
  }
  return payload;
};

export default async function submitEvent(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const {event, sessions}: {
    event: ClientInputEvent,
    sessions: ClientInputSession[]
  } = req.body;
  const payload: ServerEvent[] = prepareEventPayload(event, sessions);
  const r = (await (await fetch(`${serverUrl}/new`, {
    method: 'POST',
    body: JSON.stringify({data: payload}),
    headers: {'Content-type': 'application/json'},
  })).json());
  console.log(r);
  res.status(200).json({r});
}
