import { hash, verify } from "argon2";

const passwordUtil = {
  async hash(password) {
    return hash(password);
  },
  async compare(password, hash) {
    return await verify(hash, password);
  },
};

export default passwordUtil;
