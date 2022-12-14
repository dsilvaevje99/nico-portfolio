const mongoose = require("mongoose");
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//this method will hash the password before saving the user model
userSchema.pre("save", async function (next: Function) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }
  next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = sign(
    { _id: user._id, name: user.name, username: user.username },
    "secret"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//this method search for a user by username and password.
userSchema.statics.findByCredentials = async (
  username: string,
  password: string
) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid login details");
  }
  const isPasswordMatch = await compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid login details");
  }
  return user;
};

const User = mongoose.model("Users", userSchema);
module.exports = User;
