import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Row,
  Col,
  Button,
  Label,
} from "../../../components";
import { useDispatch } from "react-redux";
import { createQuestion, updateQuestion } from "../../../app/actions/question";
import { highlight, languages } from "prismjs/components/prism-core";
import { Formik, Form, Field, FieldArray } from "formik";
import { nanoid } from "nanoid";
import { coverListDateToOption, coverItemDataSelect } from "../../../app/utils";

import Select from "react-select";
import Editor from "react-simple-code-editor";
import IconAdd from "../../../assets/img/icon-add.svg";

const Modal2CreateQuestion = (props) => {
  const { isShow, handleClose, categories, courses, questionDetail } = props;
  const [listCategories, setListCategories] = useState([]);
  const [listCourses, setListCourses] = useState([]);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (questionDetail.name) {
      setCode(questionDetail.name);
    }
  }, [questionDetail]);

  useEffect(() => {
    setListCategories(coverListDateToOption(categories.data));
    setListCourses(coverListDateToOption(courses));
  }, [categories, courses]);

  const onSubmit = async (values, helpers) => {
    const data = {
      name: code,
      categoryId: values.categoryId.value,
      answers: values.answers,
      courseId: values.courseId.value,
    };
    if (questionDetail._id) {
      dispatch(updateQuestion(data, questionDetail._id));
    } else {
      dispatch(createQuestion(data));
    }
    helpers.resetForm();
    handleCloseResetFrom();
  };

  const handleCloseResetFrom = () => {
    handleClose();
    setCode("");
  };

  return (
    <Modal
      centered
      isOpen={isShow}
      toggle={handleCloseResetFrom}
      style={{
        maxWidth: "600px",
      }}
    >
      <ModalHeader>
        {questionDetail ? "Update" : "Create"} a Question
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            answers: questionDetail.answers || [
              {
                content: "",
                id: nanoid(),
                isCorrect: false,
              },
            ],
            categoryId: coverItemDataSelect(questionDetail.category) || "",
            courseId:
              coverItemDataSelect({
                id: questionDetail.courseId,
                name: questionDetail.courseName,
              }) || "",
          }}
          onSubmit={onSubmit}
          validateOnBlur
          validateOnChange
        >
          {({ setFieldValue, values }) => (
            <Form>
              <FormGroup>
                <Label>Enter the category of the question here:</Label>
                <Select
                  id="categoryId"
                  classNamePrefix="filter__dropdown"
                  name="categoryId"
                  value={values.categoryId}
                  isClearable
                  options={listCategories}
                  onChange={(option) => setFieldValue("categoryId", option)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Enter the course of the question here:</Label>
                <Select
                  id="courseId"
                  classNamePrefix="filter__dropdown"
                  name="courseId"
                  value={values.courseId}
                  isClearable
                  options={listCourses}
                  onChange={(option) => setFieldValue("courseId", option)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Enter the content of the question here:</Label>
                <Editor
                  name="name"
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  placeholder="code hear"
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    border: "1px solid",
                  }}
                />
              </FormGroup>
              <FieldArray
                name="answers"
                render={(arrayHelpers) => (
                  <>
                    {values.answers.map(({ id, content, isCorrect }, index) => (
                      <FormGroup key={index}>
                        <Row key={index}>
                          <Col md="8">
                            <Field
                              className="form-control w-100 h-100"
                              name={`answers[${index}].content`}
                              placeholder={`Enter the content of the answer ${
                                index + 1
                              } here`}
                            />
                            <Field
                              hidden
                              name={`answers[${index}].id`}
                              placeholder="u"
                            />
                          </Col>
                          <Col md="4" className="d-flex justify-content-end">
                            <Button
                              className="w-25"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </Button>
                            <Button
                              onClick={() =>
                                arrayHelpers.replace(index, {
                                  id: id,
                                  content: content,
                                  isCorrect: !isCorrect,
                                })
                              } // insert an empty string at a position
                            >
                              {isCorrect === false ? "check" : "uncheck"}
                            </Button>
                          </Col>
                        </Row>
                      </FormGroup>
                    ))}

                    <FormGroup>
                      <Row>
                        <Col md="12">
                          <Button
                            size="large"
                            className="w-100"
                            block
                            onClick={() =>
                              arrayHelpers.push({
                                content: "",
                                id: nanoid(),
                                isCorrect: false,
                              })
                            }
                          >
                            <img className="ml-2" src={IconAdd} />
                            &nbsp;Add question
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </>
                )}
              />
              <Row className="d-flex justify-content-end">
                <Col md="3">
                  <Button
                    color="primary"
                    className="text-capitalize w-100 mr-2"
                    outline
                    onClick={handleCloseResetFrom}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md="3">
                  <Button
                    color="primary"
                    className="text-capitalize w-100"
                    type="submit"
                  >
                    {questionDetail._id ? "Update" : "Create"}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default Modal2CreateQuestion;
