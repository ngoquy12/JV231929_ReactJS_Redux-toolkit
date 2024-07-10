import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loadUserFromCookie } from "../services/authService";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(loadUserFromCookie(JSON.parse(token)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = Cookies.get("token");
      if (!token) {
        alert("Phiên của bạn đã hết. Vui lòng đăng nhập lại");
        navigate("/login");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div>
      <header className="h-[56px] w-full bg-gray-400 flex items-center px-6 justify-end gap-3">
        {userData && (
          <>
            <span> Tên đăng nhập: {userData?.fullName}</span>
            <Button onClick={handleLogout} type="primary">
              Đăng xuất
            </Button>
          </>
        )}
      </header>
    </div>
  );
}
