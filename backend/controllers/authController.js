const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};


exports.signup = (req, res) => {
    const { email, password } = req.body;
  
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword
    };
    users.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
  

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  
    
    res.status(201).json({ token });
  };