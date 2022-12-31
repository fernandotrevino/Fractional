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
    posts(offset: Int, limit: Int): [Post!]!
    followers:[Follows]!
  }

  type Follows {
 
    user_id: String
    follower_id: String
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
    followers(id: Int!): [Follows]
  }

  type Mutation {
    addPost(input: AddPostInput!): Post
    AddFollower(input: AddFollowerInput!): Follows
  }

  input AddFollowerInput{
    id:Int
    user_id: String
    follower_id: Int
  }

  input AddPostInput {
    id: Int
    text: String!
    user_id: String!
    source_id: Int!
  }

`;

export const server = new ApolloServer({ typeDefs, resolvers });
