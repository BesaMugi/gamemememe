// Фронтенд: resourceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchResources = createAsyncThunk("fetch/Resources", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4004/resources");
    const resources = await res.json();
    return resources;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addResource = createAsyncThunk(
  "add/Resource",
  async (resourceName, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4004/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: resourceName }),
      });

      const resource = await res.json();
      return resource;
    } catch (error) {
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
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.resources = action.payload;
        state.loading = false;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addResource.fulfilled, (state, action) => {
        // console.log("Ресурс добавлен:", action.payload);
        state.resources = [...state.resources, action.payload];
      });
  },
});

export default resourceSlice.reducer;
