const myip = require('quick-local-ip');

const getWebHost = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.WEB_HOST as string;
  }

  return `http://localhost:8000`;
};

const getApiHost = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.API_HOST as string;
  }

  return `http://localhost:8080`;
};

export default {
  getWebHost,
  getApiHost
};
