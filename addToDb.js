const { MongoClient } = require('mongodb');
require('dotenv').config();

// Define an array of new techniques
const newTechniques = [
    {
        name: "Lefkoe Technique",
        description: `Steps of the Decision Maker® Change Perspective Process
1. Describe a situation that is upsetting you.
2. What does it mean to you?
3. Doesn’t it seem that ____________________ is the truth?
[what it means to you (#2)]
4. What are some alternative meanings? In other words, what else could the situation
logically mean? (Elicit three or four)
5. If there are other meanings that are just as reasonable, can you see that your original
meaning is only a truth and not the truth? (Answer will be, yes)
6. Did you ever see ________________________ in the world? (Answer will be, no)
[the original meaning (#2)]
7. Can you see that the events have no inherent meaning?
That ___________________ doesn’t really mean anything? (Answer will be, yes)
[the situation (#1)]
8. State ____________________. Is it really the truth? (Answer will be, no)
[the original meaning (#2)]
9. Think about the situation. Does it still upset you? (Answer will be, no)

As soon as you realize that you never saw your belief, it was only one
interpretation of many, that you never saw it in the world, and that the situation that
caused it has no inherent meaning, the belief disappears and will not return.`,
        category: "Miscellaneous",
        weight: 1,
        createdAt: new Date()
    },
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
