import http from "./httpService";
import config from "../config.json";
const userAPI = config.apiEndpoint + "user";

// http://localhost:3700/user/search/?email=123@gmail.com
const getByEmailAPI = userAPI + '/search/';

export function registerUser(user) {
    return http.post(userAPI, user);
}
export function loginUser(email){ 
  return http.get(`${getByEmailAPI}?${email}`);
}
export function getUser(uid){
  return http.get(`${userAPI}/${uid}`);
}
