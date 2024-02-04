import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchResources = createAsyncThunk("fetch/Resources", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await fetch("http://localhost:4000/resources", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resources = await res.json();
    return resources;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}
);

export const updateResourcePriceAndLevel = createAsyncThunk(
  "resources/updateResourcePriceAndLevel",
  async ({ resourceName, newPrice, newLevel, newPriceUpgrade }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("http://localhost:4000/resources/update-price-level", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resourceName, newPrice, newLevel, newPriceUpgrade }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.updatedResource;  // Return the updated resource from the server
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (error) {
      console.error("Error sending request to the server:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserResources = createAsyncThunk(
  "resources/getUserResources",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("http://localhost:4000/user-resources", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.error);
      }
    } catch (error) {
      console.error("Ошибка при получении ресурсов пользователя:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    error: null,
    loading: false,
    resources: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
        state.error = null; // Сбрасываем ошибку при начале загрузки
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.resources = action.payload;
        state.loading = false;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Сохраняем только сообщение об ошибке
      })

      .addCase(updateResourcePriceAndLevel.fulfilled, (state, action) => {
        const updatedResource = action.payload;
        state.resources = state.resources.map((resource) =>
           resource.name === updatedResource.name ? { ...updatedResource } : resource
        );
        state.loading = false;
     })

      .addCase(getUserResources.fulfilled, (state, action) => {
        state.resources = action.payload
      })
  },
});

export default resourceSlice.reducer;
