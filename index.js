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
    const RequestFoodCollection = client.db("FoodDB").collection("Food Name");


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


    app.get("/requestedFood", async (req, res) => {
      const cursor = RequestFoodCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })



    app.get("/requestedFoodd/:FoodName", async (req, res) => {

      const FoodName = req.params.FoodName
      const query = { FoodName: FoodName };
      const cursor = RequestFoodCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })




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


    // http://localhost:5000/FeaturedFoods/AddFood?DonatorEmail=riad1@gmail.com

    app.get("/FeaturedFoods/AddFood", async (req, res) => {

      let query = {}
      const DonatorEmail = req.query.DonatorEmail

      if (DonatorEmail) {
        query.DonatorEmail = DonatorEmail
      }
      const cursor = FoodCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);

    })





    app.get("/requestedFood/request", async (req, res) => {

      let query = {}
      const RequesterEmail = req.query.RequesterEmail

      if (RequesterEmail) {
        query.RequesterEmail = RequesterEmail
      }
      const cursor = RequestFoodCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);

    })




    //  http://localhost:5000/requestedFood/FoodName?FoodName=

    app.get("/requestedFood/FoodName", async (req, res) => {

      let query = {}
      const FoodName = req.query.FoodName

      if (FoodName) {
        query.FoodName = FoodName
      }
      const cursor = RequestFoodCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);

    })

 
    app.post('/AddFood', async (req, res) => {
      const AddFood = req.body;
      const result = await FoodCollection.insertOne(AddFood);
      res.send(result)

    })


    app.post('/RequestFood', async (req, res) => {
      const request = req.body;
      const result = await RequestFoodCollection.insertOne(request);
      res.send(result)

    })



    app.put('/FeaturedFoods/Ubdate/:id', async (req, res) => {

      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const food = req.body;
      const options = { upsert: true };
      const ubdateFood = {
        $set: {

          foodName: food.foodName,
          foodImage: food.foodImage,
          PickupLocation: food.PickupLocation,
          DonatorName: food.DonatorName,
          DonatorImage: food.DonatorImage,
          DonatorEmail: food.DonatorEmail,
          ExpiredDate: food.ExpiredDate,
          FoodQuantity: food.FoodQuantity,
          AdditionalNotes: food.AdditionalNotes,
        }
      }

      const result = await FoodCollection.updateOne(filter, ubdateFood, options)
      res.send(result)
    })




    app.patch('/RequestFood/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const update = req.body;
      // console.log(update)
      const updateDoc = {
        $set: {
          FoodStatus: update.FoodStatus,
        }
      }
      const result = await RequestFoodCollection.updateOne(filter, updateDoc)
      res.send(result)

    })




    // app.delete("/FeaturedFoods/deleted/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await FoodCollection.deleteOne(query);
    //   res.send(result);

    // })


    app.delete("/RequestFood/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await RequestFoodCollection.deleteOne(query);
      res.send(result);

    })


    app.delete("/RequestFood/deleted/:RequesterEmail", async (req, res) => {
      const RequesterEmail = req.params.RequesterEmail
      const query = { RequesterEmail: RequesterEmail };
      const result = await RequestFoodCollection.deleteOne(query);
      res.send(result);

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