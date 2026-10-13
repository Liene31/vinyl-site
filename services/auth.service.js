import { validateUserInput } from "../utility/validateUserInput.js";

export const authService = {
  registerUser: (userData) => {
    return validateUserInput(userData);
  },
};
