import jwt from "jsonwebtoken";

const jwtUtil = {
  sign(data) {
    return jwt.sign(data, "secret key");
  },

  decode(token) {
    return jwt.decode(token, "secret key");
  },
};

export default jwtUtil;
