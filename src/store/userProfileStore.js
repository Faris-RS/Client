import { create } from "zustand";

const userProfileStore = create((set) => ({
  profilePage: "about",
  setUserProfile: (newUserProfile) => set({ profilePage: newUserProfile }),
  // OPTIONS
  // about  : userProfile
  // edit   : editPofile
  // history: viewSnippetHistory
  // peeps  : connection list

  otherProfilePage: "about",
  setOtherProfilePage: (newOtherProfilePage) =>
    set({ otherProfilePage: newOtherProfilePage }),
}));

export default userProfileStore;
