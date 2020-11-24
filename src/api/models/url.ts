require('dotenv').config();
import mongodb from 'mongodb';

let urls: mongodb.Collection;

interface UrlModel {
  hash: string;
  url: string;
}

export function injectDb(connection: mongodb.MongoClient) {
  if (urls) return;

  try {
    urls = connection.db(process.env.DB_NAME).collection('urls');
  } catch (e) {
    console.error(`Unable to connect to urls collection: ${e}`);
  }
}

// Mongodb's ObjectId is too long. Options right now include:
//  - hashing the url and truncating the hash to just 4-8 characters
//  - UUID generator
//  - using portions of the ObjectId. last three bytes are an incrementor.
export async function addUrl(urlModel: UrlModel) {
  try {
    const response = await urls.insertOne(urlModel);

    return response.ops;
  } catch (err) {
    console.error(`Error while adding url, ${err}.`);

    return { error: err };
  }
}

export async function getUrl(hash: string) {
  try {
    const response = await urls.findOne({ hash: hash }, { projection: { url: true } });
    return response
  } catch (err) {
    console.error(`Error while adding url, ${err}.`);

    return { error: err };
  }
}
