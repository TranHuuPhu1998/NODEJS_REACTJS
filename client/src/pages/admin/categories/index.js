import React, { useEffect, useState } from "react";
import {
  Table,
  PageTitle,
  Row,
  Col,
  Input,
  Button,
  PaginationBar,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../app/actions/category";
import { deleteCategory } from "../../../app/actions/category";
import { PAGE_INFO } from "../../../app/constants";
import AdminLayout from "../../../layout/AdminLayout";
import ModalCreateCategory from "./modalCategory";
import IconDelete from "../../../assets/img/icon-delete.svg";
import IconEdit from "../../../assets/img/icon-edit.svg";
import IconAdd from "../../../assets/img/icon-add.svg";

const Category = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState("");
  const [pageInfo, setPageInfo] = useState(PAGE_INFO);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducers);
  useEffect(() => {
    dispatch(getCategory(pageInfo));
  }, [pageInfo]);

  const handleCreateCategory = () => {
    setIsShowModal(true);
    setCategoryDetails("");
  };

  const handleUpdateCategory = (category) => {
    setIsShowModal(true);
    setCategoryDetails(category);
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(getCategory(pageInfo));
    }
  };

  const onChangeSearch = (e) => {
    setPageInfo({
      ...pageInfo,
      page: 1,
      text_search: e.target.value,
    });
  };

  const onChangePage = (number) => {
    setPageInfo({ ...pageInfo, page: Number(number) });
  };

  return (
    <AdminLayout>
      <PageTitle>CATEGORY MANAGEMENT</PageTitle>
      <Row className="d-flex justify-content-between mb-3">
        <Col md="3">
          <Input
            className="border w-md mr-3"
            placeholder="Search by category name"
            defaultValue=""
            onKeyPress={handleKeyPressSearch}
            onChange={onChangeSearch}
          />
        </Col>
        <Col xs="12" sm="4" md="4">
          <Button
            onClick={handleCreateCategory}
            color="primary"
            className="text-uppercase-fl w-100"
          >
            Create a Category <img className="ml-2" src={IconAdd} />
          </Button>
        </Col>
      </Row>
      <Table striped dark bordered>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Create By</th>
            <th>Created At</th>
            <th>Update At</th>
            <th width={100} className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.data?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.userName}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
              <td className="text-center">
                <span
                  onClick={() => handleDeleteCategory(item._id)}
                  className="mr-2 pointer"
                >
                  <img src={IconDelete}></img>
                </span>
                <span
                  onClick={() => handleUpdateCategory(item)}
                  className="pointer"
                >
                  <img src={IconEdit}></img>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {categories?.totalDocs > PAGE_INFO.limit && (
        <PaginationBar
          totalItems={categories?.totalDocs}
          itemsPerPage={PAGE_INFO.limit}
          currentPage={pageInfo.page}
          onChangePage={onChangePage}
        />
      )}
      <ModalCreateCategory
        isShow={isShowModal}
        categoryDetails={categoryDetails}
        handleClose={() => setIsShowModal(!isShowModal)}
      />
    </AdminLayout>
  );
};

export default Category;
