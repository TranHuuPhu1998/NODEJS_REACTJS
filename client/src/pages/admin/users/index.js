import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, PageTitle, Row, Col, Input, Button } from "../../../components";
import { getListUser } from "../../../app/actions/user";
import Avatar from "react-avatar";
import ModalCreateUser from "./modalUser";
import AdminLayout from "../../../layout/AdminLayout";

const Users = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const users = useSelector((state) => state.userReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUser());
  }, []);

  return (
    <AdminLayout>
      <PageTitle>USER MANAGEMENT</PageTitle>
      <Row className="d-flex justify-content-between mb-3">
        <Col md="3">
          <Input
            className="border w-md mr-3"
            placeholder="Search by User Name"
            defaultValue=""
          />
        </Col>
      </Row>
      <Table striped dark bordered>
        <thead>
          <tr>
            <th width={200}>Avatar</th>
            <th width={200}>User Name</th>
            <th width={200}>Account</th>
            <th width={200}>Role</th>
            <th width={200}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={index}>
              <td>
                <Avatar name="Foo Bar" src={item.avatar} />
              </td>
              <td>{item.name}</td>
              <td>{item.account}</td>
              <td>{item.role}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalCreateUser
        isShow={isShowModal}
        handleClose={() => setIsShowModal(!isShowModal)}
      />
    </AdminLayout>
  );
};

export default Users;
