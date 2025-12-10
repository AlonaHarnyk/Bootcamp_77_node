import { connect } from "mongoose";

export const connectMongoDb = async () => {
  const mongoUrl = process.env.MONGODB_URL;

  try {
    await connect(mongoUrl);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
