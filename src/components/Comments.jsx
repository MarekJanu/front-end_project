import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "./utils/api";
import "../App.css";

export const Comments = ({ id }) => {
  const [articleComments, setarticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentsPath = `/articles/${id}/comments`;

  useEffect(() => {
    const comArr = getCommentsByArticleId(commentsPath).then(({ comments }) => {
      setarticleComments(comments);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading) {
    return <p>Comments are loading...</p>;
  } else {
    return (
      <div>
        <h4>&nbsp;&nbsp;&nbsp;Comments</h4>
        {articleComments.map((comment) => {
          return (
            <div
              className="comDiv"
              key={comment.comment_id + comment.created_at}
            >
              <p>
                author: {comment.author}, date created:
                {comment.created_at.slice(0, 10)}
                <span className="spanVotes"> votes: {comment.votes}</span>
              </p>
              <p className="pSpec"> {comment.body}</p>
            </div>
          );
        })}
      </div>
    );
  }
};
