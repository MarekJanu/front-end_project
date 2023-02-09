import { useState } from "react";
import { handleSubmit, getCommentsByArticleId } from "./utils/api";
import "../App.css";

export const PostComment = ({ id, setArticleComments }) => {
  // just for now, user hardcoded here
  const userName = "cooljmessy";
  const [commentBody, setCommentBody] = useState("");
  const path = `/articles/${id}/comments`;

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(e, commentBody, userName, path, setArticleComments);
            setCommentBody("");
          }}
        >
          <textarea
            onChange={({ target: { value } }) => setCommentBody(value)}
            placeholder="Enter your comment here"
          ></textarea>
          <button className="button-subCom ">submit</button>
        </form>
      </div>
    </>
  );
};
