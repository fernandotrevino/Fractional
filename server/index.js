import { ApolloServer, gql } from 'apollo-server-micro';
import * as resolvers from '@/server/resolvers';

const typeDefs = gql`
  type Community {
    id: Int!
    name: String!
    description: String!
    icon: String!
    members: [User!]!
    posts(offset: Int, limit: Int): [Post!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    profile_photo: String!
    communities: [Community!]!
    follow: Boolean!
    posts(offset: Int, limit: Int): [Post!]!
  }

  type Post {
    id: Int
    text: String!
    user: User!
    user_id: String!
    name: String!
    profile_photo: String!
    source_id: Int!
    created_ts:String!
  }


  type Query {
    community(id: Int!): Community!
    user(id: Int!): User!
    posts(offset: Int, limit: Int): [Post!]!
    post(id: Int!): [Post]!
   
  }

  type Mutation {
    addPost(input: AddPostInput!): Post
  }

  input AddPostInput {
    id: Int
    text: String!
    user_id: String!
    source_id: Int!
  }

`;

export const server = new ApolloServer({ typeDefs, resolvers });
