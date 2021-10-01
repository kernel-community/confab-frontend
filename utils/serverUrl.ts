const e = process.env.ENV;
let serverUrl: string;

if (e == 'prod') {
  serverUrl = process.env.PROD_SERVER_URL || '';
} else if (e=='dev') {
  serverUrl = process.env.DEV_SERVER_URL || '';
}

export {serverUrl};
