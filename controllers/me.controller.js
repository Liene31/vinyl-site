import { meService } from "../services/me.service.js";

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({ isLoggedIn: false });
    }

    const user = await meService.getCurrentUserById(req.session.userId);
    return res.status(200).json({ isLoggedIn: true, name: user.name });
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
