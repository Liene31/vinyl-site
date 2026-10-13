import { authService } from "../services/auth.service.js";

export const authController = {
  register: (req, res) => {
    // 1. validate user
    // 2. check if user email and username exists
    // 3. if doesn't exist, can create (add user to DB)
    try {
      const userToAdd = authService.registerUser(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
    // let { name, email, username, password } = req.body;
    // const regex = /^[a-zA-Z0-9_-]{1,20}$/;

    // if (!name || !email || !username || !password) {
    //   return res.status(400).json({ error: "All fields are required." });
    // }

    // name = name.trim();
    // email = email.trim();
    // username = username.trim();

    // if (!regex.test(username)) {
    //   return res.status(400).json({ error: "Username is not valid" });
    // }

    // if (!validator.isEmail(email)) {
    //   return res.status(400).json({ error: "Email is not valid" });
    // }
  },
};
