const express = require("express")
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/techniques", async (req, res) => {
    try {
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME)
        const techniques = await collection.find({}).toArray()
        res.json(techniques)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

app.patch("/techniques/:id", async (req, res) => {
    try {
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME)
        // Use the $inc operator to increment the weight by 1
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $inc: { weight: 1 } }  // Increment weight by 1
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Technique not found" });
        }
        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: "Technique not modified" });
        }
        res.json(result);
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})

app.get("/hello", (req, res) => {
    res.json({ message: "Hello world" })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})