import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});
export const authApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});

export const authedApi = (token: string) => {
  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
