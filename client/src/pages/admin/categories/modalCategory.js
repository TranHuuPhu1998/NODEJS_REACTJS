import React from "react";
import {
  Label,
  ModalHeader,
  Modal,
  Form,
  FormGroup,
  Input,
  ModalFooter,
  ModalBody,
  Button,
} from "../../../components";
import { createCategory, updateCategory } from "../../../app/actions/category";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const modalCreateCategory = (props) => {
  const { isShow, handleClose, categoryDetails } = props;
  const dispatch = useDispatch();

  const handleCloseResetFrom = () => {
    handleClose();
    formik.resetForm();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryName: categoryDetails.name || "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("required"),
    }),
    onSubmit: (values) => {
      if (categoryDetails._id) {
        dispatch(
          updateCategory({ name: values.categoryName }, categoryDetails._id)
        );
      } else {
        dispatch(createCategory(values.categoryName));
      }
      handleCloseResetFrom();
    },
  });

  return (
    <Modal centered isOpen={isShow} toggle={handleClose}>
      <ModalHeader>Create a Category</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit} id="category">
          <FormGroup>
            <Label>Import Category Name:</Label>
            <Input
              type="text"
              name="categoryName"
              id="categoryName"
              onChange={formik.handleChange}
              value={formik.values.categoryName}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Button
          color="primary"
          className="text-capitalize w-25 mr-2"
          outline
          onClick={handleCloseResetFrom}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          className="text-capitalize w-25"
          type="submit"
          form="category"
        >
          {categoryDetails._id ? "Update" : "Create"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default modalCreateCategory;
