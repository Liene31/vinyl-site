import { getDBConnection } from "../db/db.js";
const db = await getDBConnection();

export const productsService = {
  getAllGenres: async () => {
    const genreObj = await db.all("SELECT DISTINCT genre FROM products");
    return genreObj.map(({ genre }) => genre);
  },

  getProducts: async (genre, search) => {
    let query = "SELECT * FROM products";
    let params = [];

    if (genre) {
      query += " WHERE genre = ?";
      params.push(genre);
    } else if (search) {
      query += `     
      WHERE 
        genre LIKE ?
        OR title LIKE ?
        OR artist LIKE ?
        `;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    return await db.all(query, params);
  },
};
