import axios from "axios";
import { config } from "./config.js";

export const getCat = async () => {
  const res = await axios.get(config.catUrl);
  return res?.data[0].url;
};
