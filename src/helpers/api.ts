import axios from "axios";

const BASE_URL = 'https://developer.github.com/v3/';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance