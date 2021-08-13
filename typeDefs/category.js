const { gql } = require("apollo-server-express");

module.exports = gql`
  type Category {
    _id: ID!
    name: String
    description: String
    createdAt: DataTime
    updatedAt: DataTime
  }
  # input type
  input CategoryCreateInput {
    name: String!
    description: String!
  }
  # input type
  input CategoryUpdateInput {
    name: String!
    description: String!
  }
  type Query {
    allCategorys: [Category!]!
  }
  type Mutation {
    categoryCreate(input: CategoryCreateInput!): Category!
    categoryUpdate(input: CategoryUpdateInput): Category!
  }
`;
