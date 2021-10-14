const e = process.env.ENV;
let serverUrl: string;
let slackChannel: string[];
let gCalendar: string;

if (e == 'prod') {
  serverUrl = process.env.PROD_SERVER_URL || '';
  slackChannel = ['conversations', 'conversations', 'offers'];
  gCalendar = 'conversations';
} else if (e=='dev') {
  serverUrl = process.env.DEV_SERVER_URL || '';
  slackChannel = ['testing', 'testing', 'testing2'];
  gCalendar = 'testing';
} else if (e=='staging') {
  serverUrl = process.env.PROD_SERVER_URL || '';
  slackChannel = ['testing', 'testing', 'testing2'];
  gCalendar= 'testing';
}

export {serverUrl, gCalendar, slackChannel};
