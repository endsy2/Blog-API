import { Router } from "express";
import { handleLogin, handleSigup } from "../Controllers/AuthenticationHandle.js";
import upload from "../Utils/handleImage.js";
const authRouter=Router();

authRouter.post("/login",handleLogin);

authRouter.post("/signup",upload.single('profile'),handleSigup);

export default authRouter;