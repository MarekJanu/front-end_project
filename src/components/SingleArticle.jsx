import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, errorTimeout, changeVote } from "./utils/api";
import { Comments } from "./Comments";
import { PostComment } from "./PostComment";

export const SingleArticle = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setBody] = useState("");
  const [articleAuthor, setAuthor] = useState("");
  const [articleImg, setImg] = useState("");
  const [articleDate, setDate] = useState("");
  const [articleVotes, setVotes] = useState(0);
  const [previousClick, setPreviousClick] = useState(0);
  const [doubleClickUp, setDoubleClickUp] = useState(false);
  const [doubleClickDn, setDoubleClickDn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const path = "articles/" + id;

  useEffect(() => {
    getArticleById(path).then(({ article }) => {
      setArticleTitle(article.title);
      setBody(article.body);
      setImg(article.article_img_url);
      setAuthor(article.author);
      setDate(article.created_at);
      setVotes(article.votes);
      setIsLoading(false);
    });
  }, [articleTitle, error]);
  if (error) {
    errorTimeout({ setDoubleClickUp, setDoubleClickDn, setError });
    return <h2>Error while voting. Please try again.</h2>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>{articleTitle}</h2>
        <p>
          By {articleAuthor}, publishing date: {articleDate.slice(0, 10)}
        </p>
        <img className="imgArt" src={articleImg} />

        <p>
          <button
            disabled={doubleClickUp}
            value={1}
            onClick={(e) =>
              changeVote(
                e,
                path,
                setVotes,
                setPreviousClick,
                previousClick,
                setDoubleClickUp,
                setDoubleClickDn,
                setError
              )
            }
          >
            🔺
          </button>
          &nbsp;&nbsp;Votes: {articleVotes}&nbsp;&nbsp;
          <button
            disabled={doubleClickDn}
            value={-1}
            onClick={(e) =>
              changeVote(
                e,
                path,
                setVotes,
                setPreviousClick,
                previousClick,
                setDoubleClickUp,
                setDoubleClickDn,
                setError
              )
            }
          >
            🔻
          </button>
        </p>

        <p>{articleBody}</p>
        {/* <PostComment id={id} /> */}
        <Comments id={id} />
      </>
    );
  }
};
