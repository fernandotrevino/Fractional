

import { run } from '@/server/db';

export const addPost = async (_, { input }) => {
  const {
    text,
    user_id

  } = input;
  const post = await run("INSERT INTO posts(text,user_id) values(?,?)", text, user_id);
  return post;
}
export const addPostC = async (_, { input }) => {
  const {
    text,
    comm_id
  } = input;
  const post = await run("INSERT INTO posts(text,comm_id) values(?,?)", text, comm_id);

  return post;
}
