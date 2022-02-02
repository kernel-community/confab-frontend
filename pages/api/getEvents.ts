import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from '../../utils/env';
import {ServerEvent} from '../../types';

export default async function getEvents(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const type = req.body['type'];
  let r: ServerEvent[] = [];
  if (!type) {
    console.log('[api: getEvents]: no type provided');
    res.status(200).json({data: []});
  }
  r = (await (await fetch(`${serverUrl}/events?type=${type}`, {
    method: 'GET',
  })).json()).data;
  res.status(200).json({data: r});
}
