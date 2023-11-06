const express = require('express')
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

// riad80717
// T1VZ2SS8FdPSufQc




const uri = "mongodb+srv://riad80717:T1VZ2SS8FdPSufQc@cluster0.vifd4px.mongodb.net/?retryWrites=true&w=majority";

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

    const FoodCollection = client.db("FoodDB").collection("Featured Foods");


    app.get("/FeaturedFoods", async (req, res) => {
      const cursor = FoodCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })




    app.get("/FeaturedFoodss/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await FoodCollection.findOne(query);
      res.send(result);
    });



    // http://localhost:5000/FeaturedFoods/foodName?foodName=Spaghetti Carbonara&sortField=food_quantity&sortOrder=asc
    // http://localhost:5000/FeaturedFoods/foodName?sortField=food_quantity&sortOrder=desc

    app.get("/FeaturedFoods/foodName", async (req, res) => {

      let query = {}
      let sort = {}

      const foodName = req.query.foodName;
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;

      if (foodName) {
        query.foodName = foodName;
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