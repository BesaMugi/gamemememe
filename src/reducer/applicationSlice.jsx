import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  signUp: false,
  signIn: false,
  token: localStorage.getItem("token") || "",
  user: null,
};

export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }

      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      return thunkAPI.rejectWithValue('Ошибка аутенфикации')
    }
  }
);
export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();

      if (json.error || json.error[0].msg) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const res = await fetch("http://localhost:4000/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const userInfo = await res.json();

      if (userInfo.error) {
        return thunkAPI.rejectWithValue(userInfo.error);
      }

      return userInfo;
    } catch (error) {
      console.error("Error occurred during user info fetching:", error);
      return thunkAPI.rejectWithValue("Ошибка при получении информации о пользователе");
    }
  }
);


const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showBarToggle: (state) => {
      state.showBar = !state.showBar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authSignIn.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.token = action.payload;
          state.user = { login: action.payload.login }; // Добавляем информацию о пользователе
        }
      })
      .addCase(authSignIn.rejected, (state) => {
        state.loading = false;
      })

      .addCase(authSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSignUp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'Ошибка при регистрации';
      })

      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'Ошибка при получении информации о пользователе';
      })
  },
});

export const { showBarToggle } = authSlices.actions;
export default authSlices.reducer;
