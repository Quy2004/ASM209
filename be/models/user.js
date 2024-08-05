import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },  
    role: {
      type: Number,
      default: 0,
    },
    passwordResetToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);