import { authService } from "../services/auth.service.js";

export const authController = {
  register: async (req, res) => {
    try {
      const result = await authService.registerUser(req.body);
      console.log(result);
      req.session.userId = result.lastID;
      console.log(req.session);

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(201).json({ message: "User registered" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
