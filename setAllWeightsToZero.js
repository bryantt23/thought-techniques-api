const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateAllWeights() {
    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const collection = database.collection(process.env.COLLECTION_NAME);

        // Update all documents
        const result = await collection.updateMany(
            {}, // Filter for all documents
            { $set: { weight: 1 } } // Set weight to 1
        );

        console.log(`${result.modifiedCount} documents were updated.`);
    } catch (err) {
        console.error('Error updating weights:', err);
    } finally {
        await client.close();
    }
}

updateAllWeights();
