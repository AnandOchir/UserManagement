import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $phone: String!, $role: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, phone: $phone, role: $role, email: $email) {
      _id
      firstName
      lastName
      role
      phone
    }
  }
`

export const REMOVE_USER = gql`
  mutation RemoveUser($uid: String!) {
    removeUser(uid: $uid)
  }
`

export const REMOVE_USER_FROM_GROUP = gql`
  mutation Mutation($uid: String!, $groupId: String!) {
    removeUserFromGroup(uid: $uid, groupId: $groupId)
  }
`

export const INVITE_USER_TO_GROUP = gql`
  mutation InviteUserToGroup($uid: String!, $permissions: GroupPermissionsInput!, $groupId: String!) {
    inviteUserToGroup(uid: $uid, permissions: $permissions, groupId: $groupId) {
      name
    }
  }
`

export const ADD_GROUP = gql`
  mutation Mutation($name: String!) {
    addGroup(name: $name) {
      _id
      name
      users {
        uid
        permissions {
          addUser
          removeUser
        }
      }
    }
  }
`

export const REMOVE_GROUP = gql`
  mutation Mutation($id: String!) {
    removeGroup(_id: $id)
  }
`