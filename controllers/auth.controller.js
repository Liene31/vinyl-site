import { authService } from "../services/auth.service.js";

export const authController = {
  register: (req, res) => {
    // 1. validate user
    // 2. check if user email and username exists
    // 3. if doesn't exist, can create (add user to DB)
    try {
      authService.registerUser(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};
