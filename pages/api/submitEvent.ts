import {NextApiRequest, NextApiResponse} from 'next';
import type {ClientInputSession, ClientInputEvent, ServerEvent} from 'types';
import {serverUrl, gCalendar as gcalCalendar, slackChannel} from 'utils/env';
import {DateTime} from 'luxon';

const prepareEventPayload = (event: ClientInputEvent, sessions: ClientInputSession[]): ServerEvent[] => {
  const payload: ServerEvent[] = [];
  for (const s of sessions) {
    const startDateTime = s.startDateTime;
    const endDateTime = s.endDateTime;
    payload.push({
      title: event.title ?? '',
      descriptionText: event.descriptionText ?? '',
      descriptionHtml: event.descriptionHtml ?? '',
      location: event.location ?? '',
      series: sessions.length > 1 ? true : false,
      proposerEmail: event.proposerEmail!,
      proposerName: event.proposerName!,
      startDateTime: event.eventType == 3 ? DateTime.local().toISO() : startDateTime!,
      endDateTime: event.eventType == 3 ? DateTime.local().toISO() : endDateTime!,
      limit: Number(event.limit) || 0,
      postOnSlack: event.postOnSlack,
      slackChannel: slackChannel[event.eventType - 1],
      createGcalEvent: event.eventType == 3 ? false : true,
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
  res.status(200).json({r});
}
