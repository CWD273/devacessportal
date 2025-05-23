const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const users = [{ username: "admin", passwordHash: bcrypt.hashSync("6736", 10) }];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    res.json({ success: true, message: "Access granted!" });
  } else {
    res.status(401).json({ success: false, message: "Access denied!" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
