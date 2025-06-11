import axios from "axios";

const BASE_URL = 'https://api.github.com';

const instance = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
  });
  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )
  api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response.data)
  )
  return api
}

const apiList = {
  getUsernames: (username: string) => instance().get(`/users/${username}`),
  getReposByUsername: (username: string) => instance().get(`/users/${username}/repos`),
}

export default apiList