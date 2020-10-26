const { PORT } = require('./common/config');
const app = require('./app');
const { dropDatabase }  = require('../src/utils/MongoDb');

dropDatabase();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
