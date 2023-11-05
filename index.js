const express = require('express')
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

// riad80717
// T1VZ2SS8FdPSufQc




const uri = "mongodb+srv://riad80717:T1VZ2SS8FdPSufQc@cluster0.vifd4px.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const FoodCollection = client.db("FoodDB").collection("Featured Foods");


    app.get("/api/v1/FeaturedFoods", async (req, res) => {
      const cursor = FoodCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    })



    app.post('/AddFood', async (req, res) => {
      const AddFood = req.body;

      console.log(AddFood)
      const result = await FoodCollection.insertOne(AddFood);
      res.send(result)
     
    })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
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