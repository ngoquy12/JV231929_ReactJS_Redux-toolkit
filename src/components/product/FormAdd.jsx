import { Button, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../services/productService";

export default function FormAdd({ onClose }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
  });
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stockError, setStockError] = useState("");

  // Validate dữ  liệu đầu vào
  const validateData = (name, value) => {
    let isValid = true;
    switch (name) {
      case "name":
        if (!value) {
          setNameError("Tên không được để trống");
          isValid = false;
        } else {
          setNameError("");
        }
        break;
      case "price":
        if (!value) {
          setPriceError("Giá không được để trống");
          isValid = false;
        } else {
          setPriceError("");
        }
      case "stock":
        if (!value) {
          setStockError("Số lượng không được để trống");
          isValid = false;
        } else {
          setStockError("");
        }
        break;

      default:
        break;
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });

    validateData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gọi hàm validate
    const nameValid = validateData("name", product.name);
    const priceValid = validateData("price", product.price);
    const stockValid = validateData("stock", product.stock);

    if (nameValid && priceValid && stockValid) {
      // Gọi api thêm mới dữ liệu
      dispatch(createProduct(product));
      // Tắt form
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <Input onChange={handleChange} name="name" />
          {nameError ? (
            <>
              <p>{nameError}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label htmlFor="">Price</label>
          <Input onChange={handleChange} name="price" type="number" />
          {priceError ? (
            <>
              <p>{priceError}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label htmlFor="">Stock</label>
          <Input onChange={handleChange} name="stock" type="number" />
          {stockError ? (
            <>
              <p>{stockError}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        <Button htmlType="submit">Thêm</Button>
      </form>
    </div>
  );
}
