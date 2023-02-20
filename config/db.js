const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // This is to avoid deprecation warning

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
};

module.exports = connectDB;
