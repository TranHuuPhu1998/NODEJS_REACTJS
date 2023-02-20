import axiosService from "../axios/axios-service";
import { API_ENDPOINT } from "../constants";

const token = localStorage.getItem("TOKEN");

export const getListCourse = () => {
  return axiosService.get(`${API_ENDPOINT}/courses`);
};

export const createCourse = (data) => {
  return axiosService.post(`${API_ENDPOINT}/course`, data, token);
};

export const deleteCourse = (id) => {
  return axiosService.delete(`${API_ENDPOINT}/course/${id}`, token);
};

export const updateCourse = (data) => {
  return axiosService.patch(`${API_ENDPOINT}/course/${id}`, data, token);
};
