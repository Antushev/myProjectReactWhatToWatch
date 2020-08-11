import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401
};

const BASE_URL = `https://4.react.pages.academy/wtw`;
const TIMEOUT = 5000;
const WITH_CREDENTIALS = true;

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: WITH_CREDENTIALS
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    // throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
