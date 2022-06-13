import {
  getUsers,
  addUser,
  removeUser,
  getUser
} from './user'
import {
  addGroup,
  getGroups,
  inviteUserToGroup,
  removeUserFromGroup,
  removeGroup
} from './group'


export default {
  Query: {
    hello: () => "Hello World2",
    getUsers,
    getGroups,
    getUser
  },
  Mutation: {
    addUser,
    addGroup,
    inviteUserToGroup,
    removeUser,
    removeUserFromGroup,
    removeGroup
  }
}