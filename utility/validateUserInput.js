import validator from "validator";

export const validateUserInput = (userData) => {
  let { name, email, username, password } = userData;
  const regex = /^[a-zA-Z0-9_-]{1,20}$/;

  if (!name || !email || !username || !password) {
    throw new Error("All fields are required.");
  }

  name = name.trim();
  email = email.trim();
  username = username.trim();

  if (!regex.test(username)) {
    throw new Error("Username is not valid");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  // it's a short of name: name, email: email etc
  const validatedUserInput = {
    name,
    email,
    username,
    password,
  };

  return validatedUserInput;
};
