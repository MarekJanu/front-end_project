import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "./utils/api";

export const Comments = ({ id }) => {
  const [commByArt, setComm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentsPath = `/articles/${id}/comments`;

  useEffect(() => {
    const comArr = getCommentsByArticleId(commentsPath).then(({ comments }) => {
      setComm(comments);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading) {
    return <p>Comments are loading...</p>;
  } else {
    return (
      <div>
        <p>Comments here ...{id}</p>
        <ul>
          {commByArt.map((comment) => {
            return (
              <div key={comment.comment_id + comment.created_at}>
                <p>
                  author: {comment.author}, date created:{" "}
                  {comment.created_at.slice(0, 10)}, votes: {comment.votes}
                </p>
                <li> {comment.body}</li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
};
