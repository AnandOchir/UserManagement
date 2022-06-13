import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Query($_id: String) {
    getUsers(_id: $_id) {
      _id
      firstName
      lastName
      email
      phone
      role
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: [id]!) {
    getUser(_id: $id) {
      _id
      firstName
      lastName
    }
  }
`

export const GET_GROUPS = gql`
  query Query {
    getGroups {
      _id
      name
      users {
        uid
        permissions {
          addUser
          removeUser
        }
      }
      createdAt
    }
  }
`