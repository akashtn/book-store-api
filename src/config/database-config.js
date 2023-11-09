const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(`mongodb+srv://akashtn:${process.env.DB_PASSWORD}@cluster0.y6h2h9k.mongodb.net/`);
}

module.exports = connect;