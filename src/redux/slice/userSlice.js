import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../../services/userService";
import * as status from "../../constants/status";

// Loading: idle, pending, successed, failed

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: status.IDLE,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý các tác vụ bất đồng bộ
    // Trạng thái chờ tải dữ liệu
    builder.addCase(fetchAllUsers.pending, (state, action) => {
      state.loading = status.PENDING;
    });

    // Trạng thái lấy dữ liệu thành công
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = status.SUCCESSED;
      state.data = action.payload;
    });

    // Trạng thái lấy dữ liệu thất bại
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = status.FAILED;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
