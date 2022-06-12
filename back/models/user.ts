import mongoose from 'mongoose'

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  role: String,
  phone: String
});

export const User = mongoose.model("User", UserSchema);