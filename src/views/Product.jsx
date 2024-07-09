import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductById,
  fetchAllProducts,
} from "../services/productService";
import { Button, Modal } from "antd";
import FormAdd from "../components/product/FormAdd";
import { field } from "../resources/resourceVN";

export default function Product() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  const [idDelete, setIdDelete] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const handleShowModalDetete = (id) => {
    setIdDelete(id);
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteProductById(idDelete));
    setIsShowModal(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm && <FormAdd onClose={handleCloseForm} />}

      {
        <Modal
          okText="Xác nhận"
          cancelText="Hủy"
          title="Xác nhận"
          open={isShowModal}
          onCancel={handleCloseModal}
          centered={true}
          onOk={handleDelete}
          maskClosable={false}
        >
          Bạn có muốn xóa sản phẩm này?
        </Modal>
      }
      <h3>List Product</h3>
      <Button onClick={handleShowForm} type="primary">
        Thêm mới sản phẩm
      </Button>
      <table border={1}>
        <thead>
          <tr>
            <th>STT</th>
            <th>{field.name}</th>
            <th>{field.price}</th>
            <th>{field.stock}</th>
            <th>{field.stock}</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {loading === "pending" ? (
            <>
              <p>Loading...</p>
            </>
          ) : (
            <></>
          )}
          {data?.map((product, index) => {
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.status ? "Đang bán" : "Ngừng bán"}</td>
                <td>
                  <button>Sửa</button>
                  <button onClick={() => handleShowModalDetete(product.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
