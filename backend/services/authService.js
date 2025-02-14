const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = []; // This should be replaced with a proper database in a real application

exports.signup = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return { message: 'User registered successfully' };
};

exports.login = async (username, password) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
  return { token };
};
