const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mc9s3rj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const servicesCollection = client.db("luxuryLiving").collection("services");

        app.get('/services', async (req, res) => {
            const query = {};
            const services = await servicesCollection.find(query).toArray();
            res.send(services);
        });

    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Luxury living server running!!')
})

app.listen(port, () => {
    console.log(`Luxury living app listening on port ${port}`)
})