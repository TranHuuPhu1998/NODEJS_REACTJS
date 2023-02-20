import React, { useEffect, useState } from "react";
import {
  Table,
  PageTitle,
  CustomInput,
  Row,
  Col,
  Input,
  Button,
  PaginationBar,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, deleteQuestion } from "../../../app/actions/question";
import { getCategory } from "../../../app/actions/category";
import { getListCourse } from "../../../app/actions/course";
import { PAGE_INFO, PAGE_INFO_CATEGORY } from "../../../app/constants";
import ModalCreateQuestion from "./modalQuestion";
import AdminLayout from "../../../layout/AdminLayout";
import IconDelete from "../../../assets/img/icon-delete.svg";
import IconEdit from "../../../assets/img/icon-edit.svg";
import IconAdd from "../../../assets/img/icon-add.svg";

const DashBoard = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [questionDetail, setQuestionDetail] = useState({});
  const [pageInfo, setPageInfo] = useState(PAGE_INFO);
  const [pageInfoCategory] = useState(PAGE_INFO_CATEGORY);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionReducers);
  const categories = useSelector((state) => state.categoryReducers);
  const courses = useSelector((state) => state.courseReducers);

  useEffect(() => {
    dispatch(getQuestions(pageInfo));
  }, [pageInfo]);

  useEffect(() => {
    dispatch(getCategory(pageInfoCategory));
  }, [pageInfoCategory]);

  useEffect(() => {
    if (isShowModal === true) {
      dispatch(getListCourse());
    }
  }, [isShowModal]);

  const handleEditQuestion = (question) => {
    setQuestionDetail(question);
    setIsShowModal(true);
  };

  const handleNewQuestion = () => {
    setQuestionDetail("");
    setIsShowModal(true);
  };

  const handleDeleteQuestion = (id) => {
    dispatch(deleteQuestion(id));
  };

  const onChangeSearch = (e) => {
    setPageInfo({
      ...pageInfo,
      page: 1,
      text_search: e.target.value,
    });
  };

  const handleKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(getQuestions(pageInfo));
    }
  };

  const onChangePage = (number) => {
    setPageInfo({ ...pageInfo, page: Number(number) });
  };

  return (
    <AdminLayout>
      <PageTitle>DASHBOARD</PageTitle>
      <Row className="d-flex justify-content-between mb-3">
        <Col md="3">
          <Input
            className="border w-md mr-3"
            placeholder="Search by Question Name"
            defaultValue=""
            onKeyPress={handleKeyPressSearch}
            onChange={onChangeSearch}
          />
        </Col>
        <Col md="3" className="text-right">
          <Button
            onClick={handleNewQuestion}
            color="primary"
            className="text-uppercase-fl w-100"
          >
            <img className="ml-2" src={IconAdd} />
            &nbsp;Create a question
          </Button>
        </Col>
      </Row>
      <div style={{ overflow: "auto hidden" }}>
        <Table striped dark>
          <thead>
            <tr>
              <th width={300}>Question Name</th>
              <th width={130}>Course</th>
              <th width={120}>Category</th>
              <th width={300}>Answer / Result</th>
              <th width={100} className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {questions?.data?.map((item, index) => (
              <tr key={index}>
                <td>{item.name || "__"}</td>
                <td>{item.courseName || "__"}</td>
                <td>{item.category?.name || "__"}</td>
                <td>
                  {item.answers?.map((item, index) => (
                    <Row key={index}>
                      <Col md="10" className="mb-3">
                        {item.content}
                      </Col>
                      <Col md="2" className="text-center">
                        <CustomInput
                          type="radio"
                          id={`${item.content + index}`}
                          readOnly
                          checked={item.isCorrect === true}
                        />
                      </Col>
                    </Row>
                  ))}
                </td>
                <td className="text-center">
                  <span
                    onClick={() => handleDeleteQuestion(item._id)}
                    className="mr-2 pointer"
                  >
                    <img src={IconDelete}></img>
                  </span>
                  <span
                    onClick={() => handleEditQuestion(item)}
                    className="pointer"
                  >
                    <img src={IconEdit}></img>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {questions.totalDocs > PAGE_INFO.limit && (
        <PaginationBar
          totalItems={questions.totalDocs}
          itemsPerPage={PAGE_INFO.limit}
          currentPage={pageInfo.page}
          onChangePage={onChangePage}
        />
      )}
      <ModalCreateQuestion
        courses={courses}
        isShow={isShowModal}
        questionDetail={questionDetail}
        categories={categories}
        handleClose={() => setIsShowModal(!isShowModal)}
      />
    </AdminLayout>
  );
};

export default DashBoard;
