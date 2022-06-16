import express from "express";

const router = express.Router();

router.get("/:id", retrieveUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", UnFollowUser);
export default router;
