const { gql } = require("apollo-server-express");

module.exports = gql`
  type Message {
    _id: ID!
    content: String
    image: Image
    postedBy: User
  }
  # input type
  input MessageCreateInput {
    content: String!
    image: ImageInput
  }
  type Query {
    allMessages: [Message!]!
    messagesByUser: [Message!]!
  }
  # mutations
  type Mutation {
    messageCreate(input: MessageCreateInput!): Message!
  }
`;
