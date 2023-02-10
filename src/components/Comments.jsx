import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "./utils/api";
import { PostComment } from "./PostComment";
import "../App.css";

export const Comments = ({ id }) => {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentsPath = `/articles/${id}/comments`;

  useEffect(() => {
    const comArr = getCommentsByArticleId(commentsPath).then(({ comments }) => {
      setArticleComments(comments);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading) {
    return <p>Comments are loading...</p>;
  } else {
    return (
      <div>
        <h4>&nbsp;&nbsp;&nbsp;Comments</h4>
        <PostComment id={id} setArticleComments={setArticleComments} />
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
              <button className="button-subCom floatButton">delete me</button>
            </div>
          );
        })}
      </div>
    );
  }
};
