const myip = require('quick-local-ip');

const getWebHost = (): string => process.env.WEB_HOST as string;

const getApiHost = (): string => process.env.API_HOST as string;

export default {
  getWebHost,
  getApiHost
};
