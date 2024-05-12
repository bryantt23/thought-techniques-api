const { MongoClient } = require('mongodb');
require('dotenv').config();

// Load your techniques data
const techniques = require('./techniques').TECHNIQUES.map(tech => ({
    ...tech,
    weight: 1  // Reset weight to 1
}));

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadData() {
    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const collection = database.collection(process.env.COLLECTION_NAME);

        // Optional: Clear existing entries
        await collection.deleteMany({});

        // Insert new entries
        const result = await collection.insertMany(techniques);
        console.log(`${result.insertedCount} techniques inserted`);
    } catch (err) {
        console.error('Error uploading techniques:', err);
    } finally {
        await client.close();
    }
}

uploadData();
