import axios from "axios";
import config from "../config";

export const updateArticle = async (data: any) => {
  let response = await axios({
    method: "post",
    url: config.baseURL + "article/update",
    data,
    // responseType: 'stream'
  });
  return response;
};

export const listArticles = async () => {
  let response = await axios({
    method: "get",
    url: config.baseURL + "article/list",
    // responseType: 'stream'
  });
  return response;
};

export const getArticle = async (id: any) => {
  let response = await axios({
    method: "get",
    url: config.baseURL + `article/get?id=${id}`,
    // responseType: 'stream'
  });
  return response;
};

export const removeArticle = async (id: any) => {
  let response = await axios({
    method: "get",
    url: config.baseURL + `article/remove?id=${id}`,
    // responseType: 'stream'
  });
  return response;
};
