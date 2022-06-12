import {
  getUsers,
  addUser
} from './user'
import {
  addGroup,
  getGroups,
  inviteUserToGroup
} from './group'

export default {
  Query: {
    hello: () => "Hello World2",
    getUsers,
    getGroups
  },
  Mutation: {
    addUser,
    addGroup,
    inviteUserToGroup
  }
}