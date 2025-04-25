
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

export const connectToServer = () =>{
    database = client.db("FoundIt");
};

export const getDb =() =>{
    return database;
};

export default {connectToServer, getDb};