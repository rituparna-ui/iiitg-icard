const app = require('./src/app');
const DB = require('./src/utils/db/mongo');
const { MONGO_DB_URI, PORT } = require('./src/utils/constants');

DB(MONGO_DB_URI)
  .then(() => {
    console.log('Database connected');
    return app.listen(PORT);
  })
  .then(() => {
    console.log(`Serving on ${PORT}`);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(0);
  });
