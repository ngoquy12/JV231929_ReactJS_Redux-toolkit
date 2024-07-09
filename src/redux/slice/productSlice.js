import { createSlice, current } from "@reduxjs/toolkit";
import * as status from "../../constants/status";
import {
  createProduct,
  deleteProductById,
  fetchAllProducts,
} from "../../services/productService";

// Loading: idle, pending, successed, failed

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    loading: status.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý các tác vụ bất đồng bộ
    // Trạng thái chờ tải dữ liệu
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.loading = status.PENDING;
    });

    // Trạng thái lấy dữ liệu thành công
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = status.SUCCESSED;
      state.data = action.payload.content;
    });

    // Xóa thông tin một bản ghi theo id
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      // Lọc ra những bản ghi có id khác với id cần xóa
      state.data = state.data.filter((pro) => pro.id !== action.payload);
    });

    // Thêm mới sản phẩm
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    // Bắt lỗi thêm mới sản phẩm
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // Trạng thái lấy dữ liệu thất bại
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = status.FAILED;
      state.error = action.error.message;
    });
  },
});

export default ProductSlice.reducer;
