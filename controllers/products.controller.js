import { productsService } from "../services/products.service.js";

export const productsController = {
  getGenres: async (req, res) => {
    try {
      const genre = await productsService.getAllGenres();

      return res.status(200).json(genre);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to fetch genres", details: err.message });
    }
  },
  getProducts: async (req, res) => {
    const { genre, search } = req.query;

    try {
      const products = await productsService.getProducts(genre, search);

      return res.status(200).json(products);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to fetch products", details: err.message });
    }
  },
};
