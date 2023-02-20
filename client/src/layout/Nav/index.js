import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  RequestApiListLesson,
  RequestApiListLessonDELETE,
  SortByCategory,
} from "../../app/actions/index";
import Modal from "../Modal";
import classes from "./nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);
  const [isHover, setIsHover] = useState({
    released: "",
    id: "",
    ishover: false,
  });
  const [dataListLesson, setDataListLesson] = useState(Object);

  const ListLesson = useSelector((state) => state.listlesson);

  useEffect(() => {
    dispatch(RequestApiListLesson());
  }, [dispatch]);

  const onCloseModal = () => {
    setIsopen(!isOpen);
    document.querySelector("body").style.overflow = "auto";
  };
  const onDeleteLesson = (id) => {
    dispatch(RequestApiListLessonDELETE(id));
  };
  const onEditLesson = (data) => {
    setIsopen(!isOpen);
    setDataListLesson(data);
    document.querySelector("body").style.overflow = "hidden";
  };
  const addLisLesson = () => {
    setIsopen(!isOpen);
    setDataListLesson({ id: "" });
    document.querySelector("body").style.overflow = "hidden";
  };
  const handleMouseIn = (id, released) => {
    setIsHover({
      released: released,
      id: id,
      ishover: true,
    });
  };
  const handleMouseOut = (id, released) => {
    setIsHover({
      released: 0,
      id: 0,
      ishover: false,
    });
  };
  const handleSortByCategory = (category) => {
    dispatch(SortByCategory(category));
  };
  const onHandleShowAll = () => {
    dispatch(SortByCategory({}));
  };
  return (
    <>
      <div className={classes.quiz_nav}>
        <div onClick={addLisLesson} className={classes.quiz_add_category}>
          <p>Add ListLesson</p>
        </div>
        <div className={classes.quiz_allquestions} onClick={onHandleShowAll}>
          <p>Show All Question</p>
        </div>
        <div className={classes.listCategory}>List Category</div>
        {ListLesson.map((ele, index) => {
          return (
            <div
              key={index}
              onMouseOut={() => handleMouseOut(ele.id, ele.released)}
              onMouseOver={() => handleMouseIn(ele.id, ele.released)}
              onClick={() => handleSortByCategory(ele)}
              className={
                ele.released
                  ? classes.quiz_category
                  : classes.quiz_category + " " + classes.released
              }
            >
              <p>{ele.category}</p>
              <div className="d-flex">
                <div
                  className={classes.icon_delete}
                  onClick={() => onDeleteLesson(ele.id)}
                >
                  <img src="../../../img/trash-alt-solid.svg" alt="" />
                </div>
                <p
                  className={classes.icon_edit}
                  onClick={() => onEditLesson(ele)}
                >
                  <img src="../../../img/edit-regular.svg" alt="" />
                </p>
              </div>
              <div className={classes.position_ab}>
                {isHover.ishover === true && ele.id === isHover.id ? (
                  <div className={classes.after}>
                    {isHover.released ? "Đã công khai" : "Chưa Công Khai"}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        propsListLesson={dataListLesson}
      />
      <div className={isOpen ? classes.body_hiddel : ""}></div>
    </>
  );
};
export default Nav;
