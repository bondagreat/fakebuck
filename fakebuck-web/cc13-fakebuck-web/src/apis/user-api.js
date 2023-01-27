import axios from '../config/axios';

export const getProfileUser = (profileUserId) => {
  return axios.get('/users/' + profileUserId);
};

export const updateProfile = (formData) => {
  return axios.patch('/users', formData);
};
