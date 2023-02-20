import React, { useState, useEffect } from "react";
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
import { createCourse } from "../../../app/actions/course";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import iconUpdate from "../../../assets/img/icon-upload.svg";
import Select from "react-select";
import { imageUpload } from "../../../app/common/helpers/ImageUpload";
import * as Yup from "yup";
import "./styles.scoped.scss";

const modalCourses = (props) => {
  const { isShow, handleClose, courseDetail, categories } = props;
  const [listCategories, setListCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageBanner, setImageBanner] = useState("");

  const dispatch = useDispatch();

  const handleCloseResetFrom = () => {
    handleClose();
    formik.resetForm();
  };

  useEffect(() => {
    const resp = categories.rows?.docs.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    setListCategories(resp);
  }, [categories.rows]);

  const coverCategorySelect = (category) => {
    if (category) {
      return {
        value: category.id,
        label: category.name,
      };
    }
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

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const RenderImage = () => {
    const src = imageBanner?.base64
      ? `data: image/${imageBanner?.extension};base64,${imageBanner?.base64}`
      : courseDetail?.imageBanner;
    return <img src={src} className="img-upload" />;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      coursesName: courseDetail.name,
      categoryName: coverCategorySelect(courseDetail.category),
      release: courseDetail.released,
      descriptions: courseDetail.descriptions,
    },
    validationSchema: Yup.object({
      coursesName: Yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      let response = "";
      if (imageBanner.fileUpload) {
        response = await imageUpload(imageBanner.fileUpload);
      }
      const data = {
        name: values.coursesName,
        descriptions: values.descriptions,
        categoryId: values.categoryName.value,
        released: values.release,
        imageBanner: response.url || "",
      };
      await dispatch(createCourse(data));
      handleClose();
      setLoading(false);
    },
  });

  return (
    <Modal centered isOpen={isShow} toggle={handleClose}>
      <ModalHeader> {courseDetail ? "Update" : "Create"} a Courses</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit} id="courses">
          <FormGroup>
            <Label>Import Category Name:</Label>
            <Select
              id="categoryName"
              classNamePrefix="filter__dropdown"
              name="categoryName"
              isClearable
              options={listCategories}
              value={formik.values.categoryName || ""}
              onChange={(option) =>
                formik.setFieldValue("categoryName", option)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Import Courses Name:</Label>
            <Input
              type="text"
              name="coursesName"
              id="coursesName"
              onChange={formik.handleChange}
              value={formik.values.coursesName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Import Description:</Label>
            <Input
              type="textarea"
              name="descriptions"
              id="descriptions"
              onChange={formik.handleChange}
              value={formik.values.descriptions}
              onKeyDown={handleKeyDown}
            />
          </FormGroup>
          <FormGroup>
            <div className="avatar__preview">
              {imageBanner.base64 || courseDetail?.imageBanner ? (
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
            <Label check>Import Release:</Label>
            <Input
              type="checkbox"
              name="release"
              id="release"
              defaultChecked={formik.values.release}
              onChange={formik.handleChange}
              value={formik.values.release}
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
          form="courses"
          loading={loading}
        >
          {courseDetail ? "Update" : "Create"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default modalCourses;
