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

export const errorTimeout = ({
  setDoubleClickUp,
  setDoubleClickDn,
  setError,
}) => {
  setTimeout(() => {
    setDoubleClickUp(false);
    setDoubleClickDn(false);
    setError(null);
  }, 2000);
};

export const changeVote = (
  e,
  path,
  setVotes,
  setPreviousClick,
  previousClick,
  setDoubleClickUp,
  setDoubleClickDn,
  setError
) => {
  e.preventDefault();
  const {
    target: { value },
  } = e;
  setVotes((prevVotes) => prevVotes + +value);
  setPreviousClick((prePre) => +prePre + +value);
  if (value > 0 && previousClick === 0) {
    (() => {
      setDoubleClickUp(true);
      setDoubleClickDn(false);
    })();
  }
  if (value > 0 && previousClick === -1) {
    (() => {
      setDoubleClickUp(false);
      setDoubleClickDn(false);
    })();
  }
  if (value < 0 && previousClick === 0) {
    (() => {
      setDoubleClickUp(false);
      setDoubleClickDn(true);
    })();
  }
  if (value < 0 && previousClick === 1) {
    (() => {
      setDoubleClickUp(false);
      setDoubleClickDn(false);
    })();
  }
  patchVote(path, value).catch(({ message: err }) => setError(err));
};

export const handleSubmit = (
  e,
  commentBody,
  userName,
  path,
  setArticleComments
) => {
  e.preventDefault();
  if (commentBody.length > 3) {
    const date = new Date();
    let userComment = {
      author: userName,
      created_at: date.toString(),
      votes: 0,
      body: commentBody,
    };
    setArticleComments((currentComments) => [userComment, ...currentComments]);

    articlesAPI
      .post(path, { username: userName, body: commentBody })
      .then(({ data: { comment } }) => "")
      .catch((message) => console.log(message));
  }
};
