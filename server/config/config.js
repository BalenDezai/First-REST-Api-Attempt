const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: process.env.DEV_PORT || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'devAO',
  },
};


const test = {
  app: {
    port: process.env.TEST_PORT || 3000,
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 27017,
    name: process.env.TEST_DB_NAME || 'testAO',
  },
};


const prod = {
  app: {
    port: process.env.TEST_PORT,
  },
  db: {
    host: process.env.TEST_DB_HOST || '',
    port: process.env.TEST_DB_PORT,
    name: process.env.TEST_DB_NAME || '',
  },
};

const config = {
  dev,
  test,
  prod,
};

export default config[env];
