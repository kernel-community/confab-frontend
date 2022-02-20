import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from 'utils/env';
import {ServerEvent, ClientEvent} from 'types';

const fromClientToServerEvent = (e: ClientEvent): ServerEvent[] => {
  const serverEvents: ServerEvent[] | undefined = e.sessions?.map((session) => {
    return {
        id: session.id,
        title: e.title,
        descriptionHtml: e.descriptionHtml,
        descriptionText: e.descriptionText,
        location: e.location,
        startDateTime: session.startDateTime,
      }
    }
  )

  return serverEvents;
}

export default async function updateEvents (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    magic,
    ts,
    events
  }: {
    magic: string,
    ts: string,
    events: ClientEvent
  } = req.body;



}
