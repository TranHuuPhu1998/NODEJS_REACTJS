import React from "react";
import { signUp } from "../../app/actions/auth";
import { Input, Button, Form } from "../../components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import CardPrimary from "../../assets/img/card-primary.png";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch();

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
      dispatch(signUp(data));
    },
  });

  return (
    <div className="container box-center">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card-register card-white card">
            <div className="card-header col-md-5">
              <img alt="..." src={CardPrimary} className="card-img" />
              <h1 className="card-title font-sx">Register</h1>
            </div>
            <div className="card-body">
              <Form
                onSubmit={formik.handleSubmit}
                id="register"
                className="form"
              >
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="tim-icons icon-single-02"></i>
                    </span>
                  </div>
                  <Input
                    placeholder="name"
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="tim-icons icon-email-85"></i>
                    </span>
                  </div>
                  <Input
                    placeholder="Email"
                    type="text"
                    id="account"
                    name="account"
                    className="form-control"
                    value={formik.values.account}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="tim-icons icon-lock-circle"></i>
                    </span>
                  </div>
                  <Input
                    placeholder="Password"
                    type="text"
                    id="passWord"
                    name="password"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="text-left form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" />
                    <span className="form-check-sign"></span>I agree to the
                    <a href="#pablo">terms and conditions</a>.
                  </label>
                </div>
              </Form>
            </div>
            <div className="card-footer">
              <Button
                type="submit"
                form="register"
                className="mb-3 btn btn-primary btn-lg btn-block"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
