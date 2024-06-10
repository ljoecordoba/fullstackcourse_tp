const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    //res.send("Hola estoy funcionando.");
    res.status(200).json("Hello I am working now");
});

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
  });