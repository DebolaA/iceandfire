import { app } from './app';
import { populateDummyData } from './database/database_seed';

const environment = 'dev';
const PORT = 3300;

app.listen(PORT, () => {
  console.log(`🚂 Express started on port ${PORT}`);

  if (environment === 'dev') {
    console.log(`🌍 Running in ${environment} environment`);
    populateDummyData();
  }
});
