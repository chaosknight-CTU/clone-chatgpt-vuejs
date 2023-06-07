import mongoose from "mongoose";


class DB {
  async connect() {
    try {
      const client = mongoose.connect("mongodb://127.0.0.1:27017/vuechat");
      console.log("connected to database");
      return client;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DB();
