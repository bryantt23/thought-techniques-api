const express = require("express")
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express()
app.use(express.json())
const PORT = 3000

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/techniques", async (req, res) => {
    try {
        await client.connect();
        const collection = client.db("thought-smasher").collection("techniques")
        const techniques = await collection.find({}).toArray()
        res.json(techniques)
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