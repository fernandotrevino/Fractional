

import { run } from '@/server/db';

export const addPost = async (_, { input }) => {
  const {
    text,
    user_id,
    source_id

  } = input;
  const post = await run("INSERT INTO posts (text, user_id, source_id) VALUES (?, ?, ?) ", text, user_id, source_id);
  return post;
}


