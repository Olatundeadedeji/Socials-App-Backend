import express from "express";
import {
  deleteUser,
  followUser,
  retrieveUser,
  UnFollowUser,
  updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/:id", retrieveUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", UnFollowUser);
export default router;
