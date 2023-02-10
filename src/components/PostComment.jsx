import { useState } from "react";
import { postComment } from "./utils/api";
import "../App.css";

export const PostComment = ({ id, setArticleComments, userName }) => {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState("");
  const path = `/articles/${id}/comments`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentBody.length > 3) {
      const date = new Date();
      const tempId = Math.random();
      let userComment = {
        comment_id: tempId,
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
      postComment(path, userName, commentBody).catch((err) => setError(err));
    } else {
      setError("You need to write at least 4 characters here.");
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
