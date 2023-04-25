import { create } from "zustand";

const userStore = create((set) => ({
  // This variable is used to set the userName in homepage to that of userName
  userName: null,
  setUserName: (userNamez) => set({ userName: userNamez }),

  // This variable is used in App.jsx to check if user is logged in or not so as to
  // prevent a user from accessing login screen once they are logged in
  login: false,
  setLogin: (newLogin) => set({ login: newLogin }),

  // This variable is used for sidebar to know which logout to render, should it be
  // oauth logout or local logout
  loginMethod: "none",
  setLoginMethod: (newLoginMethod) => set({ loginMethod: newLoginMethod }),

  isOauthNew: true,
  setIsOauthNew: (newIsOauthNew) => set({ isOauthNew: newIsOauthNew }),
}));

export default userStore;
