import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";
import api from "./api";

class AuthStore {
  user = null;

  constructor() {
    makeAutoObservable(this, {});
  }
  setUser = async (token) => {
    localStorage.setItem("myToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  signUp = async (user) => {
    try {
      const response = await api.post("/signup", user);
      this.setUser(response.data.token);
    } catch (error) {}
  };
  signIn = async (user) => {
    try {
      const response = await api.post("/signin", user);
      this.setUser(response.data.token);
    } catch (error) {}
  };

  logout = () => {
    this.user = null;
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now(); //time right now
      let user = decode(token);
      if (user.exp > currentTime) {
        this.setUser(token);
      } else {
        alert("Logged out, session expired");
        this.logout();
      }
    } else {
      this.logout();
    }
  };
}
const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
