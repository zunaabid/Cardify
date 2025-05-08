// hashPassword.js
const bcrypt = require("bcryptjs");
const fs = require("fs");

// Your plain text password
const plainPassword = "123456";

// Hash it
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

// Create a user object
const user = {
  id: 1,
  email: "jerry@example.com",
  password: hashedPassword
};

// Save it to users.json
fs.writeFileSync("users.json", JSON.stringify([user], null, 2));

console.log("User with hashed password saved to users.json");
