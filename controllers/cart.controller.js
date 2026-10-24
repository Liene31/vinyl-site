import { cartService } from "../services/cart.service.js";

export const cartController = {
  addToCart: async (req, res) => {
    const item = req.body.productId;
    const userId = req.session.userId;

    try {
      await cartService.addItem(item, userId);

      return res.status(200).json({ message: "Added to cart" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  getCartCount: async (req, res) => {
    try {
      const result = await cartService.getCartCount(req.session.userId);
      const totalItems = {
        totalItems: result.totalItems || 0,
      };

      return res.status(200).json(totalItems);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await cartService.getAll(req.session.userId);
      return res.status(200).json({ items: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteItem: async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.session.userId;

    if (!itemId || isNaN(itemId)) {
      return res.status(400).json({ message: "Item ID is not valid" });
    }
    try {
      const result = await cartService.delete(itemId, userId);

      if (result.changes === 0) {
        return res.status(404).json({ message: "No matching item was found" });
      }
      res.sendStatus(204);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
