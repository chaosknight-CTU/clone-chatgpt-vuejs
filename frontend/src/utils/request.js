import axios from "axios";

import appConfig from "@/configs/app.config";
import token from "@/utils/token";

const request = axios.create({
  baseURL: appConfig.backendUrl,
  headers: {
    authorization: token.get(),
  },
});

export default request;
