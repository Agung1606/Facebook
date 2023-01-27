import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
    otherUsers: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.otherUsers = [];
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map(post => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setDeletePost: (state, action) => {
            const updatedPosts = state.posts.filter(post => {
                return post._id !== action.payload.post._id;
            })
            state.posts = updatedPosts;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('User friends non-existent exist :(')
            }
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload.otherUsers;
        },
    }
});

export const { 
    setMode, 
    setLogin, 
    setLogout, 
    setPosts, 
    setPost, 
    setDeletePost, 
    setFriends,
    setOtherUsers,
} = authSlice.actions;
export default authSlice.reducer;