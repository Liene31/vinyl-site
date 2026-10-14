import { getDBConnection } from "../db/db.js";
const db = await getDBConnection();
import { validateUserInput } from "../utility/validateUserInput.js";

export const authService = {
  registerUser: async (userData) => {
    const validatedUser = validateUserInput(userData);
    const { email, username } = validatedUser;

    if (await authService.emailAlreadyExists(email)) {
      throw new Error("Email already exists");
    } else {
      console.log("email doesn't exist, good to go ");
    }
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
};
