import { User } from "../models"

const getUsers = async (_: any, params: any) => {
  return await User.find(params ? params : {});
}

const getUser = async (_: any, { _id }: any ) => {
  const search = [];
  _id.map(({ _id }) => {
    search.push(_id)
  })
  
  return await User.find({ _id: { $in: search } });
}

const addUser = async (_: any, params: any) => {
  const user = new User(params)

  try {
    await user.save();
    return user;
  } catch (error) {
    return error;
  }
}

const removeUser = async (_: any, { uid }: any) => {
  try {
    await User.deleteOne({_id: uid})
    return true
  } catch(err) {
    return false
  }
}


export {
  getUsers,
  addUser,
  removeUser,
  getUser
}