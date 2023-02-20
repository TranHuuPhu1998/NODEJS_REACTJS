import React, { useState } from "react";
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
import iconUpdate from "../../../assets/img/icon-upload.svg";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { signUp } from "../../../app/actions/auth";
import * as Yup from "yup";
import "./styles.scoped.scss";

const modalCreateUser = (props) => {
  const { isShow, handleClose } = props;
  const [imageBanner, setImageBanner] = useState("");

  const dispatch = useDispatch();

  const handleCloseResetFrom = () => {
    handleClose();
    formik.resetForm();
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const fileParts = file.name.split(".");
    const fileName = fileParts[0];
    const extension = fileParts[1];
    // eslint-disable-next-line no-undef
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (fileReader.result) {
        const result = fileReader.result;
        const base64 = result.split(",")[1];

        setImageBanner({
          name: fileName,
          extension: extension,
          base64: base64,
          fileUpload: file,
        });
      }
    };
    fileReader.readAsDataURL(file);
  };

  const RenderImage = () => {
    const src = imageBanner.base64
      ? `data: image/${imageBanner.extension};base64,${imageBanner.base64}`
      : imageBanner;
    return <img src={src} className="img-upload" />;
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("required"),
      account: Yup.string().required("required"),
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("required"),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.name,
        account: values.account,
        password: values.password,
      };
      console.log(
        "🚀 ~ file: modalUser.js ~ line 80 ~ modalCreateUser ~ data",
        data
      );

      dispatch(signUp(data));
      handleCloseResetFrom();
    },
  });

  return (
    <Modal centered isOpen={isShow} toggle={handleClose}>
      <ModalHeader>Create a User</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit} id="user">
          <FormGroup>
            <Label>Import Avatar:</Label>
            <div className="avatar__preview">
              {imageBanner.base64 ? (
                <RenderImage />
              ) : (
                <Button tag={Label} className="button__img">
                  <Input
                    type="file"
                    hidden
                    accept=".pdf, .png, .jpeg, .jpg"
                    onChange={(e) => onChangeFile(e)}
                  />
                  <img src={iconUpdate} />
                  <p>.png / .jpeg / .pdf</p>
                </Button>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <Label>Import User Name:</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <FormGroup>
            <Label>Import Cccount:</Label>
            <Input
              type="email"
              name="account"
              id="account"
              onChange={formik.handleChange}
              value={formik.values.account}
            />
          </FormGroup>
          <FormGroup>
            <Label>Import Password:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
          form="user"
        >
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default modalCreateUser;
