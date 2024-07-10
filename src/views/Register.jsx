import { Button, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../api";
import { POST } from "../constants/httpMethod";
import { validateEmail } from "../utils/validateData";
import { BAD_REQUEST, CREATED, ERROR } from "../constants/httpStatusCode";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    password: "",
    status: 1,
  });

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateData = (name, value) => {
    const errorMessages = {
      fullName: "Tên không được để trống",
      email: {
        empty: "Email không được để trống",
        inValid: "Email không đúng định dạng",
      },
      password: "Mật khẩu không được để trống",
    };

    const setErrorFunctions = {
      fullName: setFullNameError,
      email: setEmailError,
      password: setPasswordError,
    };

    const setErrorFunction = setErrorFunctions[name];

    if (!value) {
      setErrorFunction(errorMessages[name].empty || errorMessages[name]);
      return false;
    }

    if (name === "email" && !validateEmail(value)) {
      setErrorFunction(errorMessages.email.inValid);
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

    const fullNameValid = validateData("fullName", user.fullName);
    const emailValid = validateData("email", user.email);
    const passwordValid = validateData("password", user.password);

    if (fullNameValid && emailValid && passwordValid) {
      // Submit form
      BASE_URL[POST]("auth/register", user)
        .then((response) => {
          if (response.status === CREATED) {
            notification.success({
              message: "Thông báo",
              description: "Đăng ký tài khoản thành công",
            });

            navigate("/login");
          }
        })
        .catch((error) => {
          const statusCode = error?.response?.status;
          switch (statusCode) {
            case BAD_REQUEST:
              notification.error({
                message: "Cảnh báo",
                description: Object.values(error?.response.data)[0],
              });
              break;
            case ERROR:
              notification.error({
                message: "Cảnh báo",
                description:
                  "Đã có lỗi xảy ra. Vui lòng liên hệ với quản trị viên để được trợ giúp.",
              });
              break;

            default:
              notification.error({
                message: "Cảnh báo",
                description: "Lỗi hệ thống.",
              });
              break;
          }
        });
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] border px-6 py-5 rounded shadow-md flex flex-col gap-3"
        >
          <h3 className="text-center font-bold uppercase text-[20px]">
            Đăng ký tài khoản
          </h3>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold" htmlFor="">
              Họ và tên
            </label>
            <Input
              status={fullNameError ? "error" : ""}
              onBlur={() => validateData("fullName", user.fullName)}
              onChange={handleChange}
              name="fullName"
              className="h-9"
            />
            {fullNameError && <p className="error-message">{fullNameError}</p>}
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold" htmlFor="">
              Email
            </label>
            <Input
              status={emailError ? "error" : ""}
              onBlur={() => validateData("email", user.email)}
              onChange={handleChange}
              name="email"
              className="h-9"
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-semibold" htmlFor="">
              Mật khẩu
            </label>
            <Input
              status={passwordError ? "error" : ""}
              onBlur={() => validateData("password", user.password)}
              type="password"
              onChange={handleChange}
              name="password"
              className="h-9"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div>
            <Button htmlType="submit" type="primary" className="w-full h-9">
              Đăng ký
            </Button>
          </div>
          <div className="text-center">
            <span>Bạn đã có tài khoản? </span>{" "}
            <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </>
  );
}
