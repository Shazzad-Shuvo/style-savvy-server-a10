const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// styleSavvy
// isovSa1OmY6KsJ0Y

const uri = "mongodb+srv://styleSavvy:isovSa1OmY6KsJ0Y@cluster0.kqcyimm.mongodb.net/?retryWrites=true&w=majority";

console.log(uri);

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

        const database = client.db('styleDB');
        const brandsCollection = database.collection('brands');
        const productsCollection = database.collection('products');

        // brand info api
        app.get('/brands', async(req, res) =>{
            const cursor = brandsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        
        app.post('/add', async(req, res) =>{
            const newProduct = req.body;
            const result = await productsCollection.insertOne(newProduct);
            res.send(result);
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
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
