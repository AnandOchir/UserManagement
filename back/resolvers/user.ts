import { User } from "../models"


const getUsers = async (_: any, params: any) => {
  return await User.find(params ? params : {});
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

const signUp = async (_: any, params: any) => {
  // const user =  new User
}


export {
  getUsers,
  addUser
}