import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: [],
  inputFormUpdate: { _id: "", name: "", phone: "", email: "" },
};

export const fetchedAllData = createAsyncThunk(
  "user/fetchedAllData",
  async () => {
    const res = await axios("http://localhost:3000/api/users");
    const data = await res.data;
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (user) => {
    const config = { "content-type": "application/json" };
    const { _id } = user;
    axios.put(`http://localhost:3000/api/user/${_id}`, user, config);
    return user;
  }
);

export const deleteUsersData = createAsyncThunk(
  "user/deleteUsersData",
  async (user) => {
    const { _id } = user;
    axios.delete(`http://localhost:3000/api/user/${_id}`);
    return user;
  }
);

export const addUserData = createAsyncThunk(
  "user/addUserData",
  async (user) => {
    const config = { "content-type": "application/json" };
    axios
      .post(`http://localhost:3000/api/users`, user, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
    return user;
  }
);

export const crudSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, phone, email } = action.payload;
      const user = {
        name,
        phone,
        email,
      };
      state.userData.push(user);
    },
    removeUser: (state, action) => {
      state.userData = state.userData.filter(
        (user) => user._id !== action.payload._id
      );
    },
    updateInitial: (state, action) => {
      const { _id, name, phone, email } = action.payload;
      state.inputFormUpdate = {
        _id,
        name,
        phone,
        email,
      };
    },
    updateUser: (state, action) => {
      state.userData = state.userData.map((user) => {
        if (user._id === action.payload._id) {
          const { name, phone, email } = action.payload;
          const data = {
            name,
            phone,
            email,
          };
          return data;
        } else return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchedAllData.fulfilled, (state, action) => {
      state.userData = [...state.userData, ...action.payload];
    });
    builder.addCase(deleteUsersData.fulfilled, (state, action) => {
      state.userData = state.userData.filter(
        (user) => user._id !== action.payload._id
      );
    });
    builder.addCase(addUserData.fulfilled, (state, action) => {
      const { name, phone, email } = action.payload;
      state.userData.push({
        name,
        phone,
        email,
      });
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.userData = state.userData.map((user) => {
        if (user._id === action.payload._id) {
          const { name, phone, email } = action.payload;
          const data = {
            name,
            phone,
            email,
          };
          return data;
        } else return user;
      });
    });
  },
});

export const { addUser, removeUser, updateInitial, updateUser } =
  crudSlice.actions;

export default crudSlice.reducer;
