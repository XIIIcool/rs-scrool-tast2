const { PORT } = require('./common/config');
const app = require('./app');
const { dropDatabase }  = require('../src/utils/MongoDb');
const createAdmin = require('../src/utils/createDefaultAdmin');

dropDatabase().then(() => {
  createAdmin();
}).catch(() => {
  console.error('not conneted to mongodb');
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
