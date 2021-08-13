const { gql } = require("apollo-server-express");

module.exports = gql`
  type Integrante {
    _id: ID!
    rut: String
    first_name: String
    last_name: String
    email: String
    phone: String
    createdAt: DataTime
    updatedAt: DataTime
  }
  # input type
  input IntegranteCreateInput {
    rut: String!
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
  }
  # input type
  input IntegranteUpdateInput {
    rut: String!
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
  }
  type Query {
    allIntegrantes: [Integrante!]!
    integrantesByUser: [Integrante!]!
  }
  type Mutation {
    integranteCreate(input: IntegranteCreateInput!): Integrante!
    integranteUpdate(input: IntegranteUpdateInput): Integrante!
  }
`;
