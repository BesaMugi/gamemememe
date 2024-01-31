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
});

export const addResourceToInventory = createAsyncThunk(
  "resources/addToInventory",
  async (resourceName, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const res = await fetch(`http://localhost:4000/resources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: resourceName }),
      });

      const updatedResource = await res.json();

      if (updatedResource.error) {
        return thunkAPI.rejectWithValue(updatedResource.error);
      }

      return updatedResource;
    } catch (error) {
      console.error("Error occurred during resource addition:", error);
      return thunkAPI.rejectWithValue("Ошибка при добавлении ресурса");
    }
  }
);


export const removeResource = createAsyncThunk(
  "remove/Resource",
  async (resourceName, thunkAPI) => {
      try {
          const token = localStorage.getItem("token");

          if (!token) {
              throw new Error("Token is not defined");
          }

          const response = await fetch(`http://localhost:4000/resources/eat/Ягоды`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          });

          if (response.ok) {
              return resourceName;
          } else if (response.status === 404) {
              return thunkAPI.rejectWithValue("Resource not found");
          }
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
      .addCase(addResourceToInventory.fulfilled, (state, action) => {
        state.resources = [...state.resources, action.payload];
      })
      .addCase(removeResource.fulfilled, (state, action) => {
        state.resources = state.resources.filter((r) => r.name !== action.payload.name);
      });
  },
});

export default resourceSlice.reducer;
