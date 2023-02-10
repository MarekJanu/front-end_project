import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://testncnews.onrender.com/api/",
});

export const getUsers = () => {
  return articlesAPI.get("/users").then(({ data }) => data);
};

export const getArticles = (topicName, sortValue, orderOfSort) => {
  return articlesAPI
    .get("/articles", {
      params: { topic: topicName, sort_by: sortValue, order: orderOfSort },
    })
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

export const deleteComment = (path, commId) => {
  return articlesAPI.delete(path, { comment_id: commId }).then((data) => "");
};
