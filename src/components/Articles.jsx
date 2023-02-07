import { getArticles } from "./utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic).then((data) => {
      setArticles(data);
    });
  }, [topic]);

  return (
    <section className="listDisplay">
      {articles.map((article) => {
        return (
          <div className="divDisplay" key={article.article_id}>
            <img className="imgIMG" src={article.article_img_url} />
            <h3>{article.title}</h3>
            <p>by {article.author}</p>
          </div>
        );
      })}
    </section>
  );
};
