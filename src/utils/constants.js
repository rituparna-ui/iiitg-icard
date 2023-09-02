module.exports = {
  MONGO_DB_URI: 'mongodb://localhost:27017/icard',
  PORT: process.env.PORT || 9090,
  OAUTH_CLIENT_ID:
    '533727701745-2jjh670jk35qsbb6rmarrfla0gn5gh35.apps.googleusercontent.com',
  OAUTH_CLIENT_SECRET: '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',
  OAUTH_REDIRECT_URL: 'http://172.16.12.36:9090/auth/google',
  JWT_SECRET: 'iiitg-library',
};
