export const host = import.meta.env.VITE_CHAT_URL;

export const loginRoute = `${host}/login`;
export const registerRoute = `${host}/register`;
export const logoutRoute = `${host}/logout`;
export const allUsersRoute = `${host}/allusers`;
export const sendMessageRoute = `${host}/addmsg`;
export const recieveMessageRoute = `${host}/getmsg`;
export const setAvatarRoute = `${host}/setavatar`;
