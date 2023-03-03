
import axios from "axios";
import ConfigService from "./config.service";

const appConfig = await ConfigService.getAppConfig();

const instance = axios.create({
  baseURL: appConfig?.tvApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;