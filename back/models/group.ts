import mongoose from 'mongoose'

const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: String,
  owner: String,
  users: [{
    uid: String,
    permissions: {
      addUser: Boolean,
      removeUser: Boolean
    }
  }],
  createdAt: String
});

export const Group = mongoose.model("Group", GroupSchema);