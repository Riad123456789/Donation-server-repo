const express = require('express')
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

// foodServerDB
// 3Q1sY1r8XSIXOVDR



const uri = "mongodb+srv://foodServerDB:3Q1sY1r8XSIXOVDR@cluster0.kadilur.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();



    app.get("/api/v1/services", async (req, res) => {
      res.send(' running')

    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('server is running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})