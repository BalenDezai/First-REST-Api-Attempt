const env = process.env.NODE_ENV;

const dev = {
  app: {
    port: parseInt(process.env.DEV_PORT, 10) || 3000,
  },
  jwt: {
    secret: process.env.DEV_JWTKEY || 'SuperSecret',
    expireTime: process.env.DEV_EXPIRE_TIME || '1h',
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'devAO',
  },
};


const test = {
  app: {
    port: parseInt(process.env.TEST_PORT, 10) || 3000,
  },
  Jwt: {
    secret: process.env.TEST_JWTKEY || 'SuperSecret',
    expireTime: process.env.TEST_EXPIRE_TIME || '1h',
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 27017,
    name: process.env.TEST_DB_NAME || 'testAO',
  },
};


const prod = {
  app: {
    port: parseInt(process.env.PROD_PORT, 10),
  },
  Jwt: {
    secret: process.env.PROD_JWTKEY,
    expireTime: process.env.PROD_EXPIRE_TIME,
  },
  db: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    name: process.env.PROD_DB_NAME,
  },
};

const config = {
  dev,
  test,
  prod,
};

module.exports = config[env];
