import userModel from "../models/user.model.js";
import jwtUtil from "../utils/jwt.util.js";
import passwordUtil from "../utils/password.util.js";
import ApiError from "../api-error.js";

class AuthController {
  async register(req, res, next) {
    try {
      const existingUser = await userModel.findOne({
        username: req.body.username,
      });
      if (existingUser) throw new Error("Tên người dùng đã được sử dụng");

      const newUser = (
        await userModel.create({
          ...req.body,
          password: await passwordUtil.hash(req.body.password),
        })
      ).toObject();
      delete newUser.password;

      res.status(201).send({
        data: newUser,
        accessToken: jwtUtil.sign(newUser),
      });
    } catch (error) {
      next(new ApiError(400, error.message));
    }
  }
  async login(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const existingUser = await userModel.findOne({
        username,
      });
      if (!existingUser) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác");
      }

      const isValidPassword = await passwordUtil.compare(
        password,
        existingUser.password
      );

      if (!isValidPassword) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác");
      }

      res.send({
        accessToken: jwtUtil.sign(existingUser.toObject()),
      });
    } catch (error) {
      next(new ApiError(400, error.message));
    }
  }

  async auth(req, res, next) {
    try {
      res.send({ data: req.currentUser });
    } catch (error) {
      next(new ApiError(500, error.message));
    }
  }
}

export default new AuthController();
