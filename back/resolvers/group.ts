import { Group, User } from "../models";

const getGroups = async (_: any, { uid }: any) => {
  return await User.find({
    owner: uid
  });
}

const addGroup = async (_: any, { name, uid }: any) => {
  const date = new Date();
  const users = [{
    uid: uid,
    permissions: {
      addUser: true,
      removeUser: true
    }
  }]
  const group = new Group({
    name: name,
    createdAt: date.toISOString(),
    owner: uid,
    users: users
  })

  try {
    await group.save();
    return group;
  } catch (error) {
    return error;
  }
}

const inviteUserToGroup = async (_: any, { uid, permissions, groupId }: any) => {
  const data = {
    uid: uid,
    permissions: permissions
  }
  const updateDocument = {
    $push: { "users": data }
  };

  try {
    const group = await Group.updateOne({ _id: groupId }, updateDocument);
    return group;
  } catch (error) {
    return error;
  }
}

export {
  getGroups,
  addGroup,
  inviteUserToGroup
}