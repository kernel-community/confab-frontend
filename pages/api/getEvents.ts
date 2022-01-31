import type {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from '../../utils/env';
import {ServerEvent} from '../../types';

export default async function getEvents(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const {type, now, take = 6, skip} = req.body;
  let r: ServerEvent[] = [];
  if (!type) {
    console.log('[api: getEvents]: no type provided');
    res.status(200).json({data: []});
  }
  let url = `${serverUrl}/events?type=${type}&now=${now}&take=${take}`;
  if (skip) url += `&skip=${skip}`;
  r = (await (await fetch(url, {
    method: 'GET',
  })).json()).data;
  res.status(200).json({data: r});
}
