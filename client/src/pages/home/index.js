import React from "react";
import DefaultBanner from "../../assets/img/default-firstframe.png";
import UserLayout from "../../layout/UserLayout";
import "./styles.scoped.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <UserLayout>
      <div className="home-wrapper">
        <div>
          <img src={DefaultBanner} alt="banner" />
        </div>
        <div>
          <h2 className="pt-4 text-center">
            Are you smarter than a 10th grader? Test your science knowledge.
            Learn all the answers. Impress your mom.
          </h2>
        </div>
        <Link to="/courses">Let's begin</Link>
      </div>
    </UserLayout>
  );
};

export default Home;
