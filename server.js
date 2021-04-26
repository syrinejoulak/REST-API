const express = require("express");

const app = express();

const connectDb = require("./config/connectDb");

//Body Parser
app.use(express.json());

//Connect to db
connectDb();

// creating the schema

const User = require("./models/User");

// GET :  RETURN ALL USERS
app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.send({ msg: "All users", users }))
    .catch((err) => res.send({ msg: "Cannot get users", err }));
});

//  POST :  ADD A NEW USER TO THE DATABASE
app.post("/users", (req, res) => {
  const { name, age, email, phone } = req.body;
  const user = new User({ name, age, email, phone });
  user
    .save()
    .then((newUser) => res.send({ msg: "User added successfully!", newUser }))
    .catch((err) => res.send({ msg: "Adding user failed!", err }));
});

//   PUT : EDIT A USER BY ID

app.put("/users/:userId", (req, res) => {
  const id = req.params.userId;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedUser) =>
      res.send({ msg: "the user is updated", updatedUser })
    )
    .catch((err) => res.send({ msg: "edit error", err }));
});

//DELETE : REMOVE A USER BY ID
app.delete("/users/:userId", (req, res) => {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .then((user) => {
      if (!user) {
        return res.send({ msg: "user not found" });
      }
      res.send({ msg: "user deleted with success", user });
    })

    .catch((err) => res.status(400).send({ msg: "delete error", err }));
});

//Creating server
const port = 3002;
app.listen(port, () => console.log(`Server running on ${port}`));

//env variables
