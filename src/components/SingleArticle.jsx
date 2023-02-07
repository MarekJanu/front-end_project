import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "./utils/api";

export const SingleArticle = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(id);
    const path = "articles/" + id;
    // console.log(path);
    getArticleById(path).then(({ article }) => setArticleTitle(article.title));
  }, [articleTitle]);
  //   console.log(article);

  return <p>{articleTitle}</p>;
};
