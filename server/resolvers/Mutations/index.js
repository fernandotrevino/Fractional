
import { run } from '@/server/db';

export const addPost = async (_, { input }) => {
  const { text, user_id, source_id } = input;

  const post = await run("INSERT INTO posts (text, user_id, source_id) VALUES (?, ?, ?) ", text, user_id, source_id);
  return post;
}
export const AddFollower = async (_, { input }) => {
  const { user_id, follower_id } = input;

  const followers = await run(' INSERT INTO followers (user_id, follower_id)  VALUES (?,?)', user_id, follower_id);

  return followers;

}


