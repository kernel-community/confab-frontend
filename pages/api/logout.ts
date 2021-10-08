import {NextApiRequest, NextApiResponse} from 'next';
import {Magic} from '@magic-sdk/admin';
import CookieService from '../../utils/cookie';
import Iron from '@hapi/iron';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const getLoginSession = async (req: NextApiRequest) => {
  const token = CookieService.getTokenCookie(req);
  if (!token) return;
  const session = await Iron.unseal(token, process.env.ENCRYPTION_SECRET!, Iron.defaults);
  return session;
};

export default async function(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getLoginSession(req);
  if (session) {
    await magic.users.logoutByIssuer(session.issuer);
    CookieService.removeTokenCookie(res);
  }

  res.writeHead(302, {Location: '/'});
  res.end();
}
