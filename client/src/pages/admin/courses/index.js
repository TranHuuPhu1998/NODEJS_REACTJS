import React, { useEffect, useState } from "react";
import { Table, PageTitle, Row, Col, Input, Button } from "../../../components";
import { getListCourse, deleteCourse } from "../../../app/actions/course";
import { getCategory } from "../../../app/actions/category";
import { useSelector, useDispatch } from "react-redux";
import { PAGE_INFO_CATEGORY } from "../../../app/constants";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../../layout/AdminLayout";
import IconDelete from "../../../assets/img/icon-delete.svg";
import IconEdit from "../../../assets/img/icon-edit.svg";
import IconAdd from "../../../assets/img/icon-add.svg";
import IconLeaning from "../../../assets/img/icons8-learning-64.png";
import ModalCourses from "./modalCourses";
import "./styles.scoped.scss";

const Courses = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [courseDetail, setCourseDetail] = useState({});
  const [pageInfoCategory] = useState(PAGE_INFO_CATEGORY);

  const history = useHistory();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courseReducers);
  const categories = useSelector((state) => state.categoryReducers);

  useEffect(() => {
    dispatch(getListCourse());
    dispatch(getCategory(pageInfoCategory));
  }, []);

  const handleCreateCourse = () => {
    setIsShowModal(true);
    setCourseDetail("");
  };

  const handleUpdateCourse = (value) => {
    setIsShowModal(true);
    setCourseDetail(value);
  };

  const handleDeleteCourses = (id) => {
    dispatch(deleteCourse(id));
  };

  const handleLearning = (courseId) => {
    history.push(`/exercise?courseId=${courseId}`);
  };

  return (
    <AdminLayout>
      <PageTitle>COURSE MANAGEMENT</PageTitle>
      <Row className="d-flex justify-content-between mb-3">
        <Col md="3">
          <Input
            className="border w-md mr-3"
            placeholder="Search by Courses Name"
            defaultValue=""
          />
        </Col>
        <Col md="2">
          <Button
            onClick={handleCreateCourse}
            color="primary"
            className="text-uppercase-fl w-100"
          >
            Create a Courses <img className="ml-2" src={IconAdd} />
          </Button>
        </Col>
      </Row>
      <Table striped dark bordered>
        <thead>
          <tr>
            <th>Banner</th>
            <th>Course Name</th>
            <th>Create By</th>
            <th>Category Name</th>
            <th>Released</th>
            <th>Created At</th>
            <th width={250}>Descriptions</th>
            <th width={120} className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {course?.map((item, index) => (
            <tr key={index}>
              <td width={200}>
                <img src={item?.imageBanner} />
              </td>
              <td>{item.name}</td>
              <td>{item.createBy}</td>
              <td>{item.category?.name}</td>
              <td>{item.released ? "Yes" : "No"}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                {item.descriptions.length > 250
                  ? item.descriptions.slice(0, 250) + "..."
                  : item.descriptions}
              </td>
              <td className="text-center d-flex action-content">
                <span
                  onClick={() => handleDeleteCourses(item._id)}
                  className="mr-2 pointer"
                >
                  <img src={IconDelete}></img>
                </span>
                <span
                  onClick={() => handleUpdateCourse(item)}
                  className="mr-2 pointer"
                >
                  <img src={IconEdit}></img>
                </span>
                <span
                  onClick={() => handleLearning(item._id)}
                  className="pointer icon-learning"
                >
                  <img className="w-100" src={IconLeaning}></img>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalCourses
        isShow={isShowModal}
        courseDetail={courseDetail}
        categories={categories}
        handleClose={() => setIsShowModal(!isShowModal)}
      />
    </AdminLayout>
  );
};

export default Courses;
