import validator from "validator";

export const validateUserInput = (userData) => {
  let { name, email, username, password } = userData;
  const regex = /^[a-zA-Z0-9_-]{1,20}$/;

  if (!name || !email || !username || !password) {
    return { error: "All fields are required.", status: 400 };
  }

  name = name.trim();
  email = email.trim();
  username = username.trim();

  if (!regex.test(username)) {
    return { error: "Username is not valid.", status: 400 };
  }

  if (!validator.isEmail(email)) {
    return { error: "Email is not valid.", status: 400 };
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
