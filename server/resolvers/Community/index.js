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
