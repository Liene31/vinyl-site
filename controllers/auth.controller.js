import { authService } from "../services/auth.service.js";

export const authController = {
  register: async (req, res) => {
    try {
      const result = await authService.registerUser(req.body);
      req.session.userId = result.lastID;

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(201).json({ message: "User registered" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }
      req.session.userId = result;

      return res.status(200).json({ message: "Logged in" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
