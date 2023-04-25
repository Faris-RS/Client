import { create } from "zustand";

const connectionStore = create((set) => ({
  contacts: [],
  setContacts: (newContacts) => set({ contacts: newContacts }),
}));

export default connectionStore;
