import Iron from '@hapi/iron';
import {NextApiRequest, NextApiResponse} from 'next';
import CookieService from '../../utils/cookie';
import {User} from '../../types';
import {serverUrl} from '../../utils/env';

export default async function(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  let user: User = {email: ''};
  try {
    user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET!, Iron.defaults);
  } catch (error) {
    return res.status(401).end();
  }

  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.
  let r: {ok?: boolean, data?: {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
  }} = {};
  if (user.email.length > 0) {
    try {
      r = (await (await fetch(`${serverUrl}/user/${user.email}`, {
        method: 'GET',
      })).json());
    } catch (err) {
      throw new Error('booboo');
      console.log(err);
    }
  }
  if (r.ok) {
    Object.assign(user, {name: r.data?.firstName});
  }

  res.json(user);
};
