import axios from "../config/axios";

export const deleteFriend = friendId => {
  return axios.delete('/friends/' + friendId)
}