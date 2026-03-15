require('dotenv').config();

const { loadSecrets } = require('./src/config');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

async function start() {
  const env = process.env.APP_ENV;

  if (env === 'production' || env === 'staging') {
    const secretName = `notes-api/${env}`;
    await loadSecrets(secretName);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.APP_ENV || 'development'} mode`);
  });
}

start();