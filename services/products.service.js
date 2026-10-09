import { getDBConnection } from "../db/db.js";
const db = await getDBConnection();

export const productsService = {
  getAllGenres: async () => {
    try {
      const genreObj = await db.all("SELECT DISTINCT genre FROM products");

      return genreObj.map(({ genre }) => genre);
    } finally {
      await db.close();
    }
  },
};
