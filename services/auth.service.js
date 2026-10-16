import { getDBConnection } from "../db/db.js";
import { validateUserInput } from "../utility/validateUserInput.js";
import bcrypt from "bcryptjs";

const db = await getDBConnection();

export const authService = {
  registerUser: async (userData) => {
    const validatedUser = validateUserInput(userData);

    if (validatedUser.error) {
      return validatedUser;
    }

    const { email, username } = validatedUser;

    if (await authService.emailAlreadyExists(email)) {
      return { error: "Email already exists", status: 409 };
    }

    if (await authService.usernameAlreadyExists(username)) {
      return { error: "Username already exists", status: 409 };
    }

    return await authService.create(validatedUser);
  },

  emailAlreadyExists: async (email) => {
    return await db.get(
      `
          SELECT email
          FROM users
          WHERE email = ?
          `,
      [email],
    );
  },

  usernameAlreadyExists: async (username) => {
    return await db.get(
      `
          SELECT username
          FROM users
          WHERE username = ?
          `,
      [username],
    );
  },

  create: async (user) => {
    const { name, email, username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.run(
      `
                INSERT INTO users (name, email, username, password)
                VALUES(?, ?, ?, ?)`,
      [name, email, username, hashedPassword],
    );
  },
};
