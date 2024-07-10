import { Button, Input, notification } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateData = (name, value) => {
    const errorMessages = {
      email: {
        empty: "Email không được để trống",
      },
      password: "Mật khẩu không được để trống",
    };

    const setErrorFunctions = {
      email: setEmailError,
      password: setPasswordError,
    };

    const setErrorFunction = setErrorFunctions[name];

    if (!value) {
      setErrorFunction(errorMessages[name].empty || errorMessages[name]);
      return false;
    }

    setErrorFunction("");
    return true;
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValid = validateData("email", user.email);
    const passwordValid = validateData("password", user.password);

    if (emailValid && passwordValid) {
      dispatch(login(user))
        .unwrap()
        .then(() => {
          notification.success({
            message: "Thông báo",
            description: "Đăng nhập thành công",
          });
          navigate("/");
        })
        .catch(() => {
          notification.error({
            message: "Cảnh báo",
            description: "Đăng nhập thất bại.",
          });
        });
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] border px-6 py-5 rounded shadow-md flex flex-col gap-6"
        >
          <h3 className="text-center font-bold uppercase text-[20px]">
            Đăng nhập tài khoản
          </h3>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <Input
              status={emailError ? "error" : ""}
              onBlur={() => validateData("email", user.email)}
              onChange={handleChange}
              name="email"
              id="email"
              className="h-9"
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="password" className="font-semibold">
              Mật khẩu
            </label>
            <Input
              status={passwordError ? "error" : ""}
              onBlur={() => validateData("password", user.password)}
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              className="h-9"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div>
            <Button htmlType="submit" type="primary" className="w-full h-9">
              Đăng nhập
            </Button>
          </div>
          <div className="text-center">
            <span>Bạn chưa có tài khoản? </span>{" "}
            <Link to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
    </>
  );
}
