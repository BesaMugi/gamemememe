import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: null,
  user: null,
};

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

export const updateUserInventory = createAsyncThunk(
    "update/inventory",
    async ({ userId, inventory }, thunkAPI) => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          throw new Error("User not authenticated");
        }
  
        const res = await fetch(`http://localhost:4000/users/${userId}/inventory`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ inventory }),
        });
  
        const updatedUser = await res.json();
        return updatedUser;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const updateUserEnergy = createAsyncThunk(
    "update/userEnergy",
    async ({ userId, energyChange }, thunkAPI) => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          throw new Error("User not authenticated");
        }
  
        const res = await fetch(`http://localhost:4000/users/${userId}/updateEnergy`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ energyChange }),
        });
  
        const updatedUser = await res.json();
  
        if (updatedUser.error) {
          return thunkAPI.rejectWithValue(updatedUser.error);
        }
  
        return updatedUser;
      } catch (error) {
        console.error("Error occurred during user energy update:", error);
        return thunkAPI.rejectWithValue("Ошибка при обновлении энергии пользователя");
      }
    }
  );
  
  


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    showBarToggle: (state) => {
      state.showBar = !state.showBar;
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(updateUserInventory.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(updateUserEnergy.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});

export const { showBarToggle } = userSlice.actions;
export default userSlice.reducer;
