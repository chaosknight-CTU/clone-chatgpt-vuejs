import Router from "express";
import authController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/").get(AuthMiddleware, authController.auth);

export default router;
