import { create } from "zustand";

const signinStore = create((set) => ({

  // This variable is responsible for storing the state of signup form from
  // userDetails to otpVerification and vice versa
  signupForm: "contactDetails",
  setSignupForm: (newSignupForm) => set({ signupForm: newSignupForm }),
  // OPTIONS
  // contactDetails   :   form is set to collect the user details for signup
  // otpVerification  :   form is set to verify the user mail with otp

  // This variable is responsible for changing the loginForm to forgotPassword first
  // and then cycling to otpVerification and then the form for user to reset thier password
  forgotPasswordForm: 'none',
  setForgotPasswordForm: (newForgotPasswordForm) => set({ forgotPasswordForm: newForgotPasswordForm }),
  // OPTIONS
  // none             :   not forgot password
  // mailPrompt       :   form is set to collect user mail for authentication
  // otpPrompt        :   form is set to collect otp for user verification
  // pwReset          :   form is set to reset the user password 

  // This variable is responsible for checking if the user who just logged in using oauth 
  // currently do have an account with server, or if it is thier first time logging into the server
  oauthUserForm: 'userExist',
  setOauthUserForm: (newOauthUserForm) => set({ oauthUserForm: newOauthUserForm }),
  // OPTIONS
  // userExist        :   User do have a current account with server
  // userDoNotExist   :   User does not have a current account with server

}));

export default signinStore;