export const productsController = {
  getGenres: async (req, res) => {
    console.log("genres");
    res.json({ message: "from genres" });
  },
  getProducts: async (req, res) => {
    console.log("products");
    res.json({ message: "from products" });
  },
};
