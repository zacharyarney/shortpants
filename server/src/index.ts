require('dotenv').config();
import server from './api/server';
import { MongoClient } from 'mongodb';

const port = 5000;
let mongodbUrl: string;

// dotenv uses `T | undefined` for it's environment variables, which breaks
// the MongoClient connect method because it expects only a string.
// This conditional forces mongodbUrl to be a string instead of string | undefined
if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
} else {
  mongodbUrl = 'url not found';
}

MongoClient.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(client => {
    // DB injection goes here, i.e.
    // someModelDAO.injectDb(client);
    server.listen(port, () => {
      console.log('\n=== SERVER LISTENING ON 5000 ===\n');
    });
  })
  .catch(e => {
    console.error(e.stack);
    process.exit(1);
  });
