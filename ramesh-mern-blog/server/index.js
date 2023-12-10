const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const secretKey = "shhhhh";
const cookieParser = require("cookie-parser");
mongoose.connect("mongodb://localhost:27017");

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Registration
app.post("/register", async (req, res) => {
  const { email, firstName, lastName, userName, bio, password } = req.body;
  try {
    const userData = await User.create({
      email,
      firstName,
      lastName,
      userName,
      bio,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, firstName, lastName, userName, bio, password } = req.body;
  const userData = await User.findOne({ email });
  const passOk = bcrypt.compareSync(password, userData.password);
  if (passOk) {
    jwt.sign(
      { email, firstName, lastName, userName, bio, id: userData._id },
      secretKey,
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      }
    );
  } else {
    res.status(400).json("Invalid password");
  }
});

// Get the profile details of logged in user
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// logout
app.post("/logout", (req, res) => {
  res.json("token", "").json("ok");
});

// Create a New Post
app.post("/createPost", async (req, res) => {
  const { title, content, userId, category, likes, tags } = req.body;
  const postData = await Post.create({
    title,
    content,
    userId,
    category,
    likes,
    tags,
  });
  res.json(postData);

  // Once we have the frontend connection
  // const { token } = req.cookies;
  // jwt.verify(token, secret, async (err, info) => {
  //     if (err) throw err;
  //     const { title, content, userId, category, likes, tags } = req.body;
  //     const postData = await Post.create({ title, content, userId: info.id, category, likes, tags });
  //     res.json(postData);
  // })
});

app.get("/getPosts", async (req, res) => {
  const postsData = await Post.find()
    .populate("userId")
    .sort({ createdAt: -1 }); // sorts in latest posts
  res.json(postsData);
});

// Get Post by id
app.get("/getPostById/:id", async (req, res) => {
  const { id } = req.params;
  const postData = await Post.findById({ id }).populate("userId", ["userName"]);
  res.json(postData);
});

// update post
app.put("/updatePost", async (req, res) => {
  const { content, userId, id, category, tags } = req.body;
  const postData = await Post.findById(id);
  const isAuthorized =
    JSON.stringify(postData.userId) === JSON.stringify(userId);
  if (!isAuthorized) {
    return res.status(400).json("You are not authorized");
  }
  await Post.updateOne(
    { _id: id },
    {
      content,
      category,
      tags,
    }
  )
    .then((result) =>
      res.status(200).json({ message: "Post Updated successful!" })
    )
    .catch((err) => res.status(500).json({ message: err }));
});

// delete the post
app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Post.deleteOne({ _id: id }).then(() =>
    res.status(200).json({ message: "Post Deleted Successfully" })
  );
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
