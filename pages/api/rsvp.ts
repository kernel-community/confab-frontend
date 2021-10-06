import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from '../../utils/env';

export default async function rsvp(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const rsvp: {email: string, events: number[]} = req.body['rsvp'];
  let r: boolean = false;
  if (rsvp) {
    r = (await (await fetch(`${serverUrl}/rsvp`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          email: rsvp.email,
          eventId: rsvp.events,
        },
      }),
    })).json()).ok;
  }
  res.status(200).json({ok: r});
}
