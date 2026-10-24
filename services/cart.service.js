import { getDBConnection } from "../db/db.js";

const db = await getDBConnection();

export const cartService = {
  addItem: async (item, userId) => {
    const isInCart = await cartService.findCartItem(item, userId);
    if (!isInCart) {
      const addedItem = await db.run(
        `
                INSERT INTO cart_items (user_id, product_id)
                VALUES(?, ?)`,
        [userId, item],
      );

      return addedItem;
    }
    const updatedQuantity = await cartService.updateQuantity(item, userId);
    return updatedQuantity;
  },
  findCartItem: async (item, userId) => {
    return await db.get(
      `
          SELECT *
          FROM cart_items
          WHERE user_id = ? AND product_id = ?
          `,
      [userId, item],
    );
  },

  updateQuantity: async (item, userId) => {
    return await db.run(
      `
                UPDATE cart_items 
                SET quantity = quantity + 1
                WHERE product_id = ? AND user_id = ?`,
      [item, userId],
    );
  },

  getCartCount: async (userId) => {
    return await db.get(
      `
          SELECT SUM(quantity) AS totalItems
          FROM cart_items
          WHERE user_id = ?
          `,
      [userId],
    );
  },

  getAll: async (userId) => {
    return await db.all(
      `
          SELECT p.*, ci.quantity
          FROM products p
          JOIN cart_items ci
          ON p.id = ci.product_id
          WHERE ci.user_id = ?
          `,
      [userId],
    );
  },
};
