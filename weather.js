import axios from "axios";
import { config } from "./config.js";

export const getWeather = async (ctx) => {
  let locationLatitude = ctx.message.location.latitude;
  let locationLongitude = ctx.message.location.longitude;
  const res = await axios.get(
    config.weatherUrl + `${locationLatitude}, ${locationLongitude}`
  );

  let text = `Сейчас в ${res.data.location.name}е, температура воздуха: ${res.data.current.temp_c}°C, влажность ${res.data.current.humidity}%`;
  return text;
};
