import React from "react";
import { useFormik } from "formik";
import { Input, Button, Form } from "../../components";
import { Link } from "react-router-dom";
import { login } from "../../app/actions/auth";
import { useDispatch } from "react-redux";
import CardPrimary from "../../assets/img/card-primary.png";
import AuthLayout from "../../layout/AuthLayout";
import * as Yup from "yup";

const SignIn = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: Yup.object({
      account: Yup.string().required("required"),
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("required"),
    }),
    onSubmit: (values) => {
      const data = {
        account: values.account,
        password: values.password,
      };
      dispatch(login(data));
    },
  });

  return (
    <AuthLayout>
      <div className="container box-center">
        <div className="ml-auto mr-auto col-md-6 col-lg-4">
          <Form onSubmit={formik.handleSubmit} id="login" className="form">
            <div className="card-login card-white card">
              <div className="card-header">
                <img alt="..." src={CardPrimary} />
                <h1 className="card-title">Log in</h1>
              </div>
              <div className="card-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="tim-icons icon-email-85" />
                    </span>
                  </div>
                  <Input
                    placeholder="Email or Name"
                    type="text"
                    id="account"
                    name="account"
                    className="form-control"
                    value={formik.values.account}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="tim-icons icon-lock-circle" />
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
              </div>
              <div className="card-footer">
                <Button
                  type="submit"
                  form="login"
                  className="mb-3 btn btn-primary btn-lg btn-block"
                >
                  Login
                </Button>
                <div className="pull-left">
                  <h6>
                    <Link to="/create-account" className="link footer-link">
                      Create Account
                    </Link>
                  </h6>
                </div>
                <div className="pull-right">
                  <h6>
                    <Link to="for-got-password" className="link footer-link">
                      For Got Password
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
