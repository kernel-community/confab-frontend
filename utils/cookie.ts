import {serialize, parse} from 'cookie';
import {NextApiRequest, NextApiResponse} from 'next';

const TOKEN_NAME = 'api_token';
const MAX_AGE = 60 * 60 * 8;

function createCookie(
    name:any, data:any, options = {},
) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  });
}

function setTokenCookie(res: NextApiResponse, token: string) {
  res.setHeader('Set-Cookie', [
    createCookie(TOKEN_NAME, token),
    createCookie('authed', true, {httpOnly: false}),
  ]);
}

function getAuthToken(cookies: any) {
  return cookies[TOKEN_NAME];
}

function removeTokenCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie',
      serialize(TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
      }));
}

function parseCookies(req: NextApiRequest) {
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

function getTokenCookie(req: NextApiRequest) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}

export default {
  setTokenCookie,
  getAuthToken,
  removeTokenCookie,
  getTokenCookie,
};
