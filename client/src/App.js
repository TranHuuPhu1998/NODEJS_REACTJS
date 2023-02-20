import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AUTHORIZATION_KEY } from "./app/constants";
import routes from "./app/routes";
import routesUnauth from "./app/routes/routesUnath";
import LayoutAuth from "./layout";
import LoadingTop from "./layout/Loading/LoadingTop";
import LoadingSpin from "./layout/Loading/LoadingSpin";
import jwt_decode from "jwt-decode";
import { logout } from "./app/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import "./assets/css/black-dashboard-react.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/common.css";
import "react-toastify/dist/ReactToastify.css";
/* Syntax highlighting */
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const DelayedFallback = () => {
  useEffect(() => {
    return () => {
      clearTimeout(100);
    };
  }, []);

  return <LoadingSpin />;
};

const RenderApp = ({ authenticated }) => {
  const appRoutes = authenticated ? routes : routesUnauth;

  return (
    <React.Suspense fallback={<DelayedFallback />}>
      <Switch>
        {appRoutes?.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={() => {
                return React.createElement(route.component);
              }}
            />
          );
        })}
        <Redirect to="/" />
      </Switch>
    </React.Suspense>
  );
};

const App = () => {
  const token = localStorage.getItem(AUTHORIZATION_KEY);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const exp = jwt_decode(token).exp;
      if (exp < Date.now() / 1000) {
        dispatch(logout(exp));
      }
    }
  }, []);

  return (
    <Router>
      <RenderApp authenticated={token} />
      <LoadingTop />
    </Router>
  );
};

export default App;
