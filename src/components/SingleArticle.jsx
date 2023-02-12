import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchVote } from "./utils/api";
import { Comments } from "./Comments";
import { Loading } from "./Loading";

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
    getArticleById(path)
      .then(({ article }) => {
        setArticleTitle(article.title);
        setBody(article.body);
        setImg(article.article_img_url);
        setAuthor(article.author);
        setDate(article.created_at);
        setVotes(article.votes);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => setError("No article found, try something diffrent..."));
  }, [articleTitle]);

  const changeVote = (e) => {
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

  if (error) {
    return <h2>{error}</h2>;
  }
  if (isLoading) {
    return <Loading />;
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
            onClick={(e) => changeVote(e)}
          >
            🔺
          </button>
          &nbsp;&nbsp;Votes: {articleVotes}&nbsp;&nbsp;
          <button
            disabled={doubleClickDn}
            value={-1}
            onClick={(e) => changeVote(e)}
          >
            🔻
          </button>
        </p>

        <p>{articleBody}</p>
        <Comments id={id} />
      </>
    );
  }
};
