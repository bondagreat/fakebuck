import axios from '../config/axios';
import { getAccessToken } from '../utils/local-storage';

export const register = (input) => axios.post('/auth/register', input);
export const login = (input) => axios.post('/auth/login', input);
export const getMe = () =>
  axios.get('/auth/me', {
    headers: { authorization: `Bearer ${getAccessToken()}` },
  });
