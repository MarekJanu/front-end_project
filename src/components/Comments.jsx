import { useState, useEffect } from "react";
import { getCommentsByArticleId, deleteComment } from "./utils/api";
import { PostComment } from "./PostComment";
import "../App.css";

export const Comments = ({ id }) => {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optionalMsg, setOptionalMsg] = useState("");
  const getCommPath = `/articles/${id}/comments`;
  const userName = "cooljmessy";

  useEffect(() => {
    getCommentsByArticleId(getCommPath).then(({ comments }) => {
      setArticleComments(comments);
      setIsLoading(false);
    });
  }, [id]);

  const handleDelete = ({ target: { value: commId } }) => {
    const delCommPath = `/comments/${commId}`;
    let tempControl = false;

    const littleHelper = articleComments.filter(
      (comment) => comment.comment_id === +commId
    );
    littleHelper[0].author === userName
      ? (tempControl = true)
      : (tempControl = false);

    if (tempControl) {
      const filteredComments = articleComments.filter(
        (comment) => comment.comment_id !== +commId
      );
      setArticleComments(filteredComments);
      setOptionalMsg("comment deleted");
      deleteComment(delCommPath, commId).catch((err) =>
        setOptionalMsg("something went wrong...")
      );
    } else {
      setOptionalMsg("you can only delete your comment");
    }
  };
  if (isLoading) {
    return <p>Comments are loading...</p>;
  } else {
    return (
      <div>
        <h4>&nbsp;&nbsp;&nbsp;Comments</h4>
        <PostComment
          id={id}
          setArticleComments={setArticleComments}
          userName={userName}
        />
        <p className="someclass">{optionalMsg}</p>
        {articleComments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <div className="comDiv">
                <p className="pSpec2">
                  author: {comment.author}, date created:{" "}
                  {comment.created_at.slice(0, 10)},{" "}
                  {comment.created_at.slice(11, 16)}
                  <span className="spanVotes"> votes: {comment.votes}</span>
                </p>
                <p className="pSpec"> {comment.body}</p>
              </div>
              <button
                className="button-subCom floatButton"
                value={comment.comment_id}
                onClick={handleDelete}
              >
                delete me
              </button>
            </div>
          );
        })}
      </div>
    );
  }
};
