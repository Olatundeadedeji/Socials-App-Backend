import express from "express";
import { userRegister } from "@controllers/AuthenticationController.js";

const router = express.Router();

router.post("/register", userRegister);

export default router;
