import { getDBConnection } from "../db/db.js";

export const meService = {
  getCurrentUserById: async (id) => {
    const db = await getDBConnection();

    return await db.get(
      `
          SELECT name
          FROM users
          WHERE id = ?
          `,
      [id],
    );
  },
};
