import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://testncnews.onrender.com/api/",
});

export const getArticles = () => {
  return articlesAPI.get("/articles").then(({ data }) => console.log(data));
};
