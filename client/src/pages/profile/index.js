import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { imageUpload } from "../../app/common/helpers/ImageUpload";
import { updateUserAvatar, getOneUser } from "../../app/actions/user";
import { useFormik } from "formik";

import UserLayout from "../../layout/UserLayout";
import * as Yup from "yup";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducers);
  const [loadImages, setLoadImages] = useState("");
  const [logoImage, setLogoImage] = useState();

  useEffect(() => {
    dispatch(getOneUser());
  }, [loadImages]);

  useEffect(() => {
    setLogoImage(user.at(0)?.avatar);
  }, [user, loadImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.at(0)?.name,
      email: user.at(0)?.account,
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {},
  });

  const RenderImage = () => {
    const src = logoImage.base64
      ? `data: image/${logoImage.extension};base64,${logoImage.base64}`
      : logoImage;
    return <img src={src} className="text-center" />;
  };

  const onLogoSelected = async (e) => {
    const file = e.target.files[0];
    const photo = await imageUpload(file);
    dispatch(updateUserAvatar(photo.url));
    setLoadImages(Date.now());
  };

  return (
    <UserLayout>
      <Form id="info-profile" className="mt-32" onSubmit={formik.handleSubmit}>
        <Row className="gap-2">
          <Col md="6">
            <Card secondary>
              <CardBody>
                <FormGroup row>
                  <Col md="12">
                    <Label>Name</Label>
                    <Input
                      id="name"
                      placeholder="name"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name || ""}
                      invalid={formik.touched.name && !!formik.errors.name}
                    />
                    <FormFeedback>{formik.errors.name}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Label>Email</Label>
                    <Input
                      id="email"
                      placeholder="email"
                      type="text"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email || ""}
                      invalid={formik.touched.email && !!formik.errors.email}
                    />
                    <FormFeedback>{formik.errors.email}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Label>Pass Word Old</Label>
                    <Input
                      id="password_old"
                      placeholder="password old"
                      type="text"
                      name="password_old"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password_old}
                      invalid={
                        formik.touched.password_old &&
                        !!formik.errors.password_old
                      }
                    />
                    <FormFeedback>{formik.errors.password_old}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Label>Pass Word New</Label>
                    <Input
                      id="password_new"
                      placeholder="password new"
                      type="text"
                      name="password_new"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password_new}
                      invalid={
                        formik.touched.password_new &&
                        !!formik.errors.password_new
                      }
                    />
                    <FormFeedback>{formik.errors.password_new}</FormFeedback>
                  </Col>
                </FormGroup>
                <Button color="primary" block className="rounded-lg mt-30">
                  Save
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <FormGroup className="main__avatar">
              <div className="text-center">
                {logoImage?.base64 ? (
                  <RenderImage />
                ) : (
                  <img src={logoImage} className="text-center" />
                )}
              </div>
            </FormGroup>
            <Button tag={Label} color="primary" block className="rounded-lg">
              Upload Your Logo
              <Input
                type="file"
                hidden
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => onLogoSelected(e)}
              />
            </Button>
          </Col>
        </Row>
      </Form>
    </UserLayout>
  );
};

export default Profile;
