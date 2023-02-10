import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://testncnews.onrender.com/api/",
});

export const getArticles = (topicName) => {
  return articlesAPI
    .get("/articles", { params: { topic: topicName } })
    .then(({ data }) => data);
};

export const getArticleById = (id) => {
  return articlesAPI.get(id).then(({ data }) => data);
};

export const getCommentsByArticleId = (id) => {
  return articlesAPI.get(id).then(({ data }) => data);
};

export const patchVote = (path, vote) => {
  return articlesAPI.patch(path, { inc_votes: vote });
};

export const postComment = (path, userName, commentBody) => {
  return articlesAPI
    .post(path, { username: userName, body: commentBody })
    .then(({ data: { comment } }) => "");
};
