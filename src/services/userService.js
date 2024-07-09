import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { GET } from "../constants/httpMethod";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    // Call API
    const response = await BASE_URL[GET]("users");
    return response.data;
  }
);
