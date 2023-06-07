import appConfig from "@/configs/app.config";
import request from "./request";

const token = {
  get() {
    return window?.localStorage.getItem(appConfig.accessTokenName);
  },
  set(accessToken) {
    window?.localStorage.setItem(appConfig.accessTokenName, accessToken);
    request.defaults.headers.authorization = accessToken;
  },
};

export default token;
