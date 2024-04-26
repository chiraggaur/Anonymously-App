import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  verifyCode: string;
  verfiyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: [Message];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Usename Cannot be Empty"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email Cannot be Empty "],
    unique: true,
    match: [
      /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      "Please use a valid email address",
    ],
  },
  verifyCode: {
    type: String,
    required: [true, "VerifyCode Cannot be Empty "],
  },
  verfiyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code expiry is required "],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: false,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
