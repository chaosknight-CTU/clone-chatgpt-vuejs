import { Schema, model } from "mongoose";

import validatorUtil from "../utils/validators.util.js";

const User = new Schema(
  {
    username: {
      type: String,
      require: [true, "Tên đăng nhập là bắt buộc"],
      unique: [true, "Tên đăng nhập này đã được sử dụng"],
    },
    email: {
      type: String,
      validate: {
        validator: validatorUtil.email,
        message: "Địa chỉ email không hợp lệ",
      },
    },
    password: { type: String },
  },
  { timestamps: true }
);

export default model("User", User);
