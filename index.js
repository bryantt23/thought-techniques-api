const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

app.get("/hello", (req, res) => {
    res.json({ message: "Hello world" })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})