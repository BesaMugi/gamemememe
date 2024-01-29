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
// export const userGet = createAsyncThunk("user/userGet", async (_, thunkAPI) => {
//   try {
//     const state = thunkAPI.getState();
//     const token = state.auth.token;

//     if (!token) {
//       throw new Error("No token available");
//     }

//     const res = await fetch("http://localhost:4000/user", {
//       headers: {
//         Authorization: token,
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Error fetching user");
//     }

//     const user = await res.json();
//     return user;
//   } catch (error) {
//     console.error("Error in userGet action creator:", error);
//     throw new Error("Error fetching user");
//   }
// });



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
        state.loading = false
        if (action.payload) {
          state.token = action.payload;
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

      // .addCase(userGet.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(userGet.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.user = action.payload;
      //   console.log(state.user)
      // })
      // .addCase(userGet.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error =
      //     action.error.message || "Ошибка получении пользователя";
      // })
  },
});

export const { showBarToggle } = authSlices.actions;
export default authSlices.reducer;
