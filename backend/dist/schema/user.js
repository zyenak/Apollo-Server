export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    loginUser(email: String!, password: String!): AuthPayload
  }
`;
