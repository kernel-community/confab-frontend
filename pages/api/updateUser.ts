import {NextApiRequest, NextApiResponse} from 'next';
import {serverUrl} from '../../utils/env';

export default async function submitEvent(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const {email, name} = req.body;
  const r = (await (await fetch(`${serverUrl}/user`, {
    method: 'POST',
    body: JSON.stringify({data: {
      email, name,
    }}),
    headers: {'Content-type': 'application/json'},
  })).json()).data;
  res.status(200).json({r});
}
