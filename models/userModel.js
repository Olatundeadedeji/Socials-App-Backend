import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
    isUserAdmin: {
      type: Boolean,
      default: false,
    },
    aboutMe: String,
    stayAt: String,
    workAt: String,
    relationshipStatus: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);
