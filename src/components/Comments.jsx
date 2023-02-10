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
    const comArr = getCommentsByArticleId(getCommPath).then(({ comments }) => {
      setArticleComments(comments);
      setIsLoading(false);
    });
  }, [id]);

  const handleDelete = ({ target: { value: commId } }) => {
    const delCommPath = `/comments/${commId}`;

    const littleHelper = articleComments.filter(
      (article) => article.author === userName && article.comment_id === +commId
    );
    let filteredComments = [commId];
    if (littleHelper.length > 0) {
      filteredComments = articleComments.filter(
        (comment) => comment.comment_id !== +commId
      );
      setArticleComments(filteredComments);
      setOptionalMsg("comment deleted");
      deleteComment(delCommPath, commId).catch((err) =>
        setOptionalMsg("something went wrong...")
      );
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
                <p>
                  author: {comment.author}, date created:
                  {comment.created_at.slice(0, 10)}
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
