import { get } from '@/server/db';
import { query } from '@/server/db'

export const user = async (_, { id }) => {
  const user = await get(`
    SELECT * 
    FROM users 
    WHERE id = ?
  `, [id]);

  return user;
};


export const community = async (_, { id }) => {
  const community = await get(`
    SELECT * 
    FROM communities 
    WHERE id = ?
  `, [id]);

  return community;
};

export const followers = async (_, { id }) => {

  const followers = await query(`
  SELECT f.*
  FROM memberships m
  JOIN follower f on m.user_id = f.id
  WHERE m.user_id = ?
    `, [id]);

  return followers

};
export const post = async (_, { id }) => {
  const post = await query(`
  SELECT posts.id, posts.text, posts.user_id, users.name, users.profile_photo
  FROM posts
  INNER JOIN users
  ON posts.user_id = users.id
  WHERE users.id = ?;
  `, [id]);

  return post;
};


export const posts = async (_, { offset, limit }) => {
  const posts = await query(`
  SELECT DISTINCT posts.*, users.name, users.profile_photo
  FROM posts
  INNER JOIN users
  ON posts.user_id = users.id
  ORDER BY posts.created_ts DESC;
  `);
  return posts.slice(offset, limit + offset);

};