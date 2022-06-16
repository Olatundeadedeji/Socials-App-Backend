import express from "express";
const router = express.Router();

router.post("/", createPost);
router.get("/:id", retrivePost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);
export default router;
