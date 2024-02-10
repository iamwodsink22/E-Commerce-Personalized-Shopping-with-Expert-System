const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const data = require("./datalist");
const cors = require("cors");
const bp = require("body-parser");
const JWT_SECRET = "jwt_secret_key";
const JWT_VALIDITY = "7 days";
var cartproducts = [
  {
    id: 1,
    image:
      "https://th.bing.com/th/id/R.d213ca1ac5146636d7bb0ffda50cd3d3?rik=02lnXtrweQFIkg&riu=http%3a%2f%2fstatic.musiciansfriend.com%2fderivates%2f19%2f001%2f219%2f705%2fDV020_Jpg_Jumbo_421541.001_black_pair_V.jpg&ehk=hogZl1LZkMkz5Vts70F%2bmG0veGN8iIeNCdJegvCCxVk%3d&risl=&pid=ImgRaw&r=0",
    name: "Converse Styled",
    size: "43",
    color: "black",
    amount: 2,
    total: 600,
  },
  {
    id: 2,
    image:
      "https://www.notebookcheck.net/fileadmin/Notebooks/Apple/iPad_Air_2022/DSC0960586.JPG",
    name: "IPad Air 5",
    size: "-",
    color: "Silver",
    amount: 1,
    total: 700,
  },
];

const userList = [
  {
    id: 1,
    role: "Buyer",
    name: "Araksha Puri",
    username: "arakshapuri22",
    email: "arakshapuri22@gmail.com",
    avatar: "araksha.jpg",
    country: "Nepal",
    city: "Butwal",
    bio: "Because, I am Batman !",
    age: 25,
    // password: 'v&)3?2]:'
  },
];
console.log(data);
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.post("/api/v1/auth/token", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Checking");

    console.log(req.body);
    const { email } = req.body;
    console.log(email);
    const user = userList.find((user) => user.email === email);
    if (!user) {
      console.log("No user");
      return [400, { message: "Invalid email or password" }];
    }
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });
    console.log(accessToken);
    res.status(201).json({
      accessToken,
      user: {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        role: user.role,
        bio: user.bio,
        country: user.country,
        city: user.city,
      },
    });
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
app.get("/api/v1/get-budget", async (req, res) => {
  console.log("Hello bitch");
  return res.status(201).json(data);
});
app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("hey");
});
app.get("/api/v1/cart", async (req, res) => {
  return res.status(201).json(cartproducts);
});
app.put("/api/v1/add2cart", async (req, res) => {
  cartproducts.push(req.body);
  return res.status(201);
});

app.listen(8000, () => {
  console.log("hello");
});
