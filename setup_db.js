// setup_db.js
// Script to create 'plp_bookstore' database and 'books' collection
// Usage: node setup_db.js

const { MongoClient } = require('mongodb');

// Change this URI if using MongoDB Atlas
require('dotenv').config();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function main() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    // Create collection if it doesn't exist
    const collections = await db.listCollections({ name: 'books' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('books');
      console.log("'books' collection created in 'plp_bookstore' database.");
    } else {
      console.log("'books' collection already exists in 'plp_bookstore' database.");
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();
