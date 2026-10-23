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
};
