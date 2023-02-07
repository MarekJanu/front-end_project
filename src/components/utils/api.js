import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://testncnews.onrender.com/api/",
});

export const getArticles = (topicName) => {
  return articlesAPI
    .get("/articles", { params: { topic: topicName } })
    .then(({ data }) => data);
};
