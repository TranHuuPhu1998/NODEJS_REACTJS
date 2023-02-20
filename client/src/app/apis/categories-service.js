import axiosService from "../axios/axios-service";
import { API_ENDPOINT } from "../constants";

const token = localStorage.getItem("TOKEN");

export const getCategories = ({ pageInfo }) => {
  const { page, limit, text_search } = pageInfo;
  return axiosService.get(
    `${API_ENDPOINT}/categories?page=${page}&limit=${limit}${
      text_search ? `&name=${text_search}` : ""
    }`
  );
};

export const createCategory = (data) => {
  return axiosService.post(`${API_ENDPOINT}/category`, data, token);
};
export const updateCategory = (_data) => {
  const { data, id } = _data;
  return axiosService.patch(`${API_ENDPOINT}/category/${id}`, data, token);
};

export const deleteCategory = (id) => {
  return axiosService.delete(`${API_ENDPOINT}/category/${id}`, token);
};
