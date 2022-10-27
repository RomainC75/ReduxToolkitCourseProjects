import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk("post/getPost", async ({ id }) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((ans) => {
      return ans.data;
    });
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id }) => {
    return axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((ans) => {
        return ans.data;
      });
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (values) => {
    console.log("values : ", values);
    return axios
      .post(
        `https://jsonplaceholder.typicode.com/posts/`,
        {
          title: values.title,
          body: values.body,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then((ans) => {
        return {
          id: ans.data.id,
          title: values.title,
          body: values.body,
        };
      });
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, body, title }) => {
    return axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          title: title,
          body: body,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then((ans) => {
        return {
          ...ans.data,
        };
      });
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
    error: null,
    body:"",
    edit: false
  },
  reducer:{
    setEdit: (state, action)=>{
        state.edit=action.payload.edit
        state.body=action.payload.body
    }
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // =============================
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //==============================
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setEdit } = postSlice.actions

export default postSlice.reducer;
