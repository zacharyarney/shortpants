require('dotenv').config();
import server from './api/server';
import { MongoClient } from 'mongodb';

import * as urls from './api/models/url';

const port = 5000;

// dotenv uses `T | undefined` for it's environment variables, which breaks
// the MongoClient connect method because it expects only a string.
// This ternary forces mongodbUrl to be a string instead of string | undefined
const mongodbUrl = process.env.MONGODB_URL
  ? process.env.MONGODB_URL
  : 'url not found';

  
// if trouble connecting, remember to whitelist current IP address in Network Access panel in Atlas
MongoClient.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(db => {
    // DB injection goes here
    urls.injectDb(db);

    server.listen(port, () => {
      console.log('\n=== SERVER LISTENING ON 5000 ===\n');
    });
  })
  .catch(e => {
    console.error(e.stack);
    process.exit(1);
  });
