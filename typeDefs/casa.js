const { gql } = require("apollo-server-express");

module.exports = gql`
  type Casa {
    _id: ID!
    name: String
    address: String
    number: String
    createdAt: DataTime
    updatedAt: DataTime
  }
  # input type
  input CasaCreateInput {
    name: String!
    address: String!
    number: String!
  }
  # input type
  input CasaUpdateInput {
    name: String!
    address: String!
    number: String!
  }
  type Query {
    allCasas: [Casa!]!
    casasByUser: [Casa!]!
  }
  type Mutation {
    casaCreate(input: CasaCreateInput!): Casa!
    casaUpdate(input: CasaUpdateInput): Casa!
  }
`;
