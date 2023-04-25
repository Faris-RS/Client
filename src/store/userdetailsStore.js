import { create } from "zustand";

const userdetailsStore = create((set) => ({
  email: null,
  phone: null,
  firstName: null,
  lastName: null,
  dob: null,
  gender: null,
  password: null,
  confirmPassword: null,
  resetMail: null,
  oauthName: null,
  oauthMails: null,

  setEmails: (newEmail) => set({ email: newEmail }),
  setPhones: (newPhone) => set({ phone: newPhone }),
  setFirstNames: (newFirstName) => set({ firstName: newFirstName }),
  setLastNames: (newLastName) => set({ lastName: newLastName }),
  setDobs: (newDob) => set({ dob: newDob }),
  setGenders: (newGender) => set({ gender: newGender }),
  setPasswords: (newPassword) => set({ password: newPassword }),
  setConfirmPasswords: (newConfirmPassword) =>
    set({ confirmPassword: newConfirmPassword }),
  setResetMails: (newResetMail) => set({ resetMail: newResetMail }),
  setOauthNames: (newOauthName) => set({ oauthName: newOauthName }),
  setOauthMails: (newOauthMail) => set({ oauthMails: newOauthMail }),
}));

export default userdetailsStore;

//This store is responsible for holding userDetails during signup so that it can be processed to the backend after OtpVerification
