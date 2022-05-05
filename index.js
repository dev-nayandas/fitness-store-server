const express = require("express");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middle wire
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.euzdn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('fitness-store').collection('inventory');
        app.get('/inventory', async (req, res) => {

            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories)
        });
        // app.get('/inventory/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     const query = {_id : ObjectId(id)};
        //     const inventori = await inventoryCollection.findOne(query);
        //     res.send(inventori)
        // })

        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await inventoryCollection.findOne(query);
            res.send(inventory)
        })
    }

    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Server is runnig')
})

app.listen(port, () => {
    console.log('Inventoy is showing')
})


//user : dbuser1
// password : w2nQRKDf3Q24YJxq