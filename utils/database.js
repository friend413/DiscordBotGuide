import mongoose from "mongoose";

const mongoURI = 'mongodb://localhost:27017/discordbot'; // Change yourDatabaseName to your actual database name

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

export default mongoose;
