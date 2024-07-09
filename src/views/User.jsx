import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../services/userService";

export default function User() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);
  console.log(data, loading, error);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return (
    <div>
      <h3>List User</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DateOfBirth</th>
            <th>Email</th>
            <th>Address</th>
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
          {data?.content?.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.gender ? "Nam" : "Nữ"}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <button>Sửa</button>
                  <button>Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
