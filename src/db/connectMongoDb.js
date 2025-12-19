import { connect, syncIndexes } from "mongoose";

export const connectMongoDb = async () => {
  const mongoUrl = process.env.MONGODB_URL;

  try {
    await connect(mongoUrl);
    console.log("Connected to Mongo DB");

    await syncIndexes();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
