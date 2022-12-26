import { query } from '@/server/db';

export const members = async (community) => {
  const members = await query(`
    SELECT u.*
    FROM memberships m
    JOIN users u on m.user_id = u.id
    WHERE m.community_id = ?
  `, [community.id]);

  return members;
};



export const posts = async (community, { offset, limit }) => {

  const posts = await query(`
    SELECT DISTINCT p.*, u.name, u.profile_photo
    FROM memberships m
    JOIN posts p on m.user_id = p.user_id
    JOIN users u ON p.user_id = u.id
    WHERE p.source_id = ?
    AND m.community_id = ?
    ORDER BY p.created_ts DESC;
    `, [community.id, community.id]);
  return posts.slice(offset, limit + offset);

};
