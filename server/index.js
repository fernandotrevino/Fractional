import { ApolloServer, gql } from 'apollo-server-micro';
import * as resolvers from '@/server/resolvers';

const typeDefs = gql`
  type Community {
    id: Int!
    name: String!
    description: String!
    icon: String!
    members: [User!]!
    posts: [Post!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    profile_photo: String!
    communities: [Community!]!
    posts: [Post!]!
  }

  type Post {
    id: Int!  
    text: String!
    user: User!
    user_id: Int!
    comm_id: Int!
    created_ts:String
  }

  type feeds{

    source_id: Int!
    source_type: Int
    post_id:Int
  }
  
  type Query {
    community(id: Int!): Community!
    communities: [Community]
    user(id: Int!): User!
    users:User!
    posts: [Post!]!
    post(id: Int!): [Post]!
    commPost(id: Int!): [Post]!
    feeds:[feeds]
  }

  type Mutation {
    addPost(input:addPostI): Post
    addPostC(input:addPostCommuI): Post
  }

  input addPostCommuI{
    text: String
    comm_id: Int
  }

  input addPostI {
    text: String
    user_id: Int
    feeds:Int
  }

`;

export const server = new ApolloServer({ typeDefs, resolvers });
