import userModel from "../models/user.model.js";
import jwtUtil from "../utils/jwt.util.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const AuthMiddleware = async (req, res, next) => {
  try {
    const exist = req.headers.authorization;
    if (!exist) {
      throw new Error("Unauthorization");
    }

    const accessToken = String(exist).replace("Bearer ", "");

    if (!accessToken) {
      throw new Error("Access token is required!");
    }

    try {
      const decodeUser = jwtUtil.decode(accessToken);
      const currentUser = await userModel.findById(decodeUser._id);
      const _currentUser = currentUser.toObject();
      delete _currentUser.password;

      req.currentUser = _currentUser;
    } catch (error) {
      throw new Error("Access token is invalid or expire");
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default AuthMiddleware;
