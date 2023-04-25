import { create } from "zustand";

const postStore = create((set) => ({
    liked: false,
    setLiked: (newLiked) => set({liked: newLiked}),

    newPost: false,
    setNewPost: (newNewPost) => set({newPost: newNewPost}),
}))

export default postStore;
