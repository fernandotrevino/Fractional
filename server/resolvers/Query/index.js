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

export const users = async () => {
  const users = await query(`
  SELECT * FROM  users
  `);
  return users;
};

export const community = async (_, { id }) => {
  const community = await get(`
    SELECT * 
    FROM communities 
    WHERE id = ?
  `, [id]);

  return community;
};

export const communities = async () => {
  const communities = await query(`
    SELECT * 
    FROM communities
    `);

  return communities;
};



export const commPost = async (_, { id }) => {
  const commPost = await query(`
    SELECT * 
    FROM posts 
    WHERE comm_id = ?
  `, [id]);

  return commPost;
};
export const post = async (_, { id }) => {
  const post = await query(`
    SELECT * 
    FROM posts
    WHERE user_id = ?
  `, [id]);

  return post;
};


export const posts = async () => {
  const posts = await query(`
  SELECT  *
  FROM  communities,users ,posts
  Join feeds on
  feeds.source_id = users.id & communities.id
  
  LIMIT 5;
  ORDER BY ID  DESC;
  ` );
  return posts;

};