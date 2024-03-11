const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 80;

// MongoDB connection string
const uri = 'mongodb+srv://Anshul:77wonders@cluster0.pwzi3y3.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

// Add CORS middleware


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
// POST endpoint to store data
app.post('/store', async (req, res) => {
  try {
    const db = client.db('MobzProject');
    const collection = db.collection('People');
    const result = await collection.insertOne(req.body);
    res.status(200).json({ message: 'Data stored successfully', data: result.ops });
  } catch (err) {
    console.error('Failed to store data', err);
    res.status(500).json({ message: 'Failed to store data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
  app.get('/data', async (req, res) => {
    try {
      const db = client.db('MobzProject');
      const collection = db.collection('People');
      const data = await collection.find().toArray();
      res.status(200).json(data);
    } catch (err) {
      console.error('Failed to retrieve data', err);
      res.status(500).json({ message: 'Failed to retrieve data' });
    }
  });
