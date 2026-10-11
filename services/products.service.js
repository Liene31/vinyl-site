import { getDBConnection } from "../db/db.js";
const db = await getDBConnection();

export const productsService = {
  getAllGenres: async () => {
    const genreObj = await db.all("SELECT DISTINCT genre FROM products");
    return genreObj.map(({ genre }) => genre);
  },

  getProducts: async (genre, search) => {
    if (search) {
      const searchParam = `%${search}%`;

      return await db.all(
        "SELECT * FROM products WHERE genre LIKE ? OR title LIKE ? OR artist LIKE ?",
        searchParam,
        searchParam,
        searchParam,
      );
    }

    if (!genre) {
      return await db.all("SELECT * FROM products");
    }

    return await db.all("SELECT * FROM products WHERE genre = ?", genre);
  },
};
