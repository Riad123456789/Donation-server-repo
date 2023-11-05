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



    app.get("/FeaturedFoods", async (req, res) => {
      const cursor = FoodCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    })


    // http://localhost:5000/FeaturedFoods/foodName?food_name=Spaghetti Carbonara&sortField=food_quantity&sortOrder=asc
    // http://localhost:5000/FeaturedFoods/foodName?sortField=food_quantity&sortOrder=desc

    app.get("/FeaturedFoods/foodName", async (req, res) => {

      let query = {}
      let sort = {}

      const foodName = req.query.food_name;
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;

      if (foodName) {
        query.food_name = foodName;
      }
      if (sortField && sortOrder) {

        sort[sortField] = sortOrder
      }
      const cursor = FoodCollection.find(query).sort(sort);
      const result = await cursor.toArray();
      res.send(result);

    })






    app.post('/AddFood', async (req, res) => {
      const AddFood = req.body;
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