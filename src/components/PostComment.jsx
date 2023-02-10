import { useState } from "react";
import { postComment } from "./utils/api";
import "../App.css";

export const PostComment = ({ id, setArticleComments }) => {
  const userName = "cooljmessy";
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState("");
  const path = `/articles/${id}/comments`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentBody.length > 3) {
      const date = new Date();
      let userComment = {
        author: userName,
        created_at: date.toString(),
        votes: 0,
        body: commentBody,
      };
      setError("");
      setArticleComments((currentComments) => [
        userComment,
        ...currentComments,
      ]);
      postComment(path, userName, commentBody).catch((err) => console.log(err));
    } else {
      setError("Comment too short");
    }
  };

  return (
    <>
      <div>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={({ target: { value } }) => setCommentBody(value)}
            placeholder="Enter your comment here"
          ></textarea>
          <button disabled={false} className="button-subCom ">
            submit
          </button>
        </form>
      </div>
    </>
  );
};
