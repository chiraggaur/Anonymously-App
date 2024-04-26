import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const Connection: ConnectionObject = {};

export async function DbConnect(): Promise<void> {
  if (Connection.isConnected) {
    console.log("DB Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(db, "data coming from db");
    Connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully ");
  } catch (error) {
    console.log("DB Connection Failed ");
    process.exit(1);
  }
}
