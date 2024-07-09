import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST } from "../constants/httpMethod";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await BASE_URL[GET]("products");
    return response.data;
  }
);

export const deleteProductById = createAsyncThunk(
  "product/deleteProductById",
  async (id) => {
    await BASE_URL[DELETE](`products/${id}`);
    return id;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await BASE_URL[POST]("products", product);
    return response.data;
  }
);
