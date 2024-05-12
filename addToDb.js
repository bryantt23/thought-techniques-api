const { MongoClient } = require('mongodb');
require('dotenv').config();

// Define an array of new techniques
const newTechniques = [
    {
        name: "Deep Breathing",
        description: "Practice deep breathing to help reduce stress and improve focus.",
        category: "Relaxation",
        weight: 1,
        createdAt: new Date()
    },
    {
        name: "Progressive Muscle Relaxation",
        description: "Tense and then relax each muscle group sequentially to relax your entire body.",
        category: "Relaxation",
        weight: 1,
        createdAt: new Date()
    }
];

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadData() {
    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const collection = database.collection(process.env.COLLECTION_NAME);

        // Insert new entries
        const result = await collection.insertMany(newTechniques);
        console.log(`${result.insertedCount} techniques inserted`);
    } catch (err) {
        console.error('Error uploading techniques:', err);
    } finally {
        await client.close();
    }
}

uploadData();
