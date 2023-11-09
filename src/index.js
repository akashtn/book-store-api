const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectToMongoDB = require('./config/database-config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(process.env.SERVER_PORT, async () => {
  console.log('Server started...');
  await connectToMongoDB();
  console.log('Mongo db connected');
});