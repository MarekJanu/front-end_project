import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, patchVote } from "./utils/api";
import { Comments } from "./Comments";

export const SingleArticle = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setBody] = useState("");
  const [articleAuthor, setAuthor] = useState("");
  const [articleImg, setImg] = useState("");
  const [articleDate, setDate] = useState("");
  const [articleVotes, setVotes] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const path = "articles/" + id;

  const upVote = (e) => {
    e.preventDefault();
    setVotes((prevVotes) => prevVotes + 1);
    patchVote(path, 1);
  };

  const dnVote = (e) => {
    e.preventDefault();
    setVotes((prevVotes) => prevVotes - 1);
    patchVote(path, -1);
  };

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
  }, [articleTitle]);
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
          <button onClick={upVote}>🔺</button>
          &nbsp;&nbsp;Votes: {articleVotes}&nbsp;&nbsp;
          <button onClick={dnVote}>🔻</button>
        </p>

        <p>{articleBody}</p>
        <Comments id={id} />
      </>
    );
  }
};
