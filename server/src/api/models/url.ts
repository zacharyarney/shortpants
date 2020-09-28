require('dotenv').config();
import mongodb from 'mongodb';

let urls: mongodb.Collection;

interface addUrlArgs {
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

export async function addUrl(addUrlArgs: addUrlArgs) {
  try {
    const response = await urls.insertOne(addUrlArgs);
    return {
      response,
      success: true,
      hash: response.insertedId,
    };
  } catch (err) {
    console.error(`Error while adding url, ${err}.`);
    return { error: err };
  }
}

export async function getUrl(hash: mongodb.ObjectID) {
  return await urls.findOne({ _id: hash });
}
