import { create } from "zustand";

const modalStore = create((set) => ({
  refresh: false,
  setRefresh: (newRefresh) => set({ refresh: newRefresh }),

  isUser: false,
  setIsUser: (newIsUser) => set({ isUser: newIsUser }),

  ifContact: false,
  setIfContact: (newIfContact) => set({ ifContact: newIfContact }),

  ifRequest: false,
  setIfRequest: (newIfRequest) => set({ ifRequest: newIfRequest }),

  showUserModal: false,
  setShowUserModal: (newShowUserModal) =>
    set({ showUserModal: newShowUserModal }),

  showUserModal2: false,
  setShowUserModal2: (newShowUserModal) =>
    set({ showUserModal2: newShowUserModal }),

  showUserModal3: false,
  setShowUserModal3: (newShowUserModal) =>
    set({ showUserModal3: newShowUserModal }),

  showUserModal4: false,
  setShowUserModal4: (newShowUserModal) =>
    set({ showUserModal4: newShowUserModal }),

  showUserModal5: false,
  setShowUserModal5: (newShowUserModal) =>
    set({ showUserModal5: newShowUserModal }),

  isSnippet: false,
  setIsSnippet: (newIsSnippet) => set({ isSnippet: newIsSnippet }),

  isActive: true,
  setIsActive: (newIsActive) => set({ isActive: newIsActive }),

  showSidebar: false,
  setShowSidebar: (newShowSidebar) => set({ showSidebar: newShowSidebar }),

  showSearch: false,
  setShowSearch: (newShowSearch) => set({ showSearch: newShowSearch }),

  connection: false,
  setIsConnection: (newConnection) => set({ connection: newConnection }),
}));

export default modalStore;
