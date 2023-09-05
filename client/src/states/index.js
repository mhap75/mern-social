import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
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
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
    },
  },
});

export const { setFriends, setLogin, setLogout, setPost, setPosts, setMode } =
  authSlice.actions;

export default authSlice.reducer;

// Select the auth state slice
const selectStates = (state) => state;

// Select the token state
export const selectToken = createSelector(
  [selectStates],
  (state) => state.token,
);

// Select the user state
export const selectUser = createSelector([selectStates], (state) => state.user);

// Select the mode state
export const selectMode = createSelector([selectStates], (state) => state.mode);

// Select the posts state
export const selectPosts = createSelector(
  [selectStates],
  (state) => state.posts,
);

// Select the post state
export const selectPost = createSelector([selectStates], (state) => state.post);

// Select the token and user states
export const selectAuth = createSelector([selectStates], (state) => ({
  token: state.token,
  user: state.user,
}));
