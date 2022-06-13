import { Group } from "../models";

const getGroups = async (_: any, params: any) => {
  return await Group.find(params ? params : {});
}

const addGroup = async (_: any, { name }: any) => {
  const date = new Date();
  const group = new Group({
    name: name,
    createdAt: date.toISOString(),
    users: []
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

const removeUserFromGroup = async (_: any, { uid, groupId }: any) => {
  try {
    await Group.updateOne(
      { '_id': groupId },
      { $pull: { users: { uid: uid } } }
    )
    return true;
  } catch (error) {
    return false;
  }
}

const removeGroup = async (_: any, { _id }: any) => {
  try {
    await Group.deleteOne({_id: _id})
    return true
  } catch(err) {
    return false
  }
}

export {
  getGroups,
  addGroup,
  inviteUserToGroup,
  removeUserFromGroup,
  removeGroup
}