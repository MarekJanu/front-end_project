import { getArticles } from "./utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(topic).then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, [topic]);
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <section className="listDisplay">
        {articles.map((article) => {
          return (
            <div className="divDisplay" key={article.article_id}>
              <Link to={"/articles/" + article.article_id}>
                <img className="imgIMG" src={article.article_img_url} />
                <h3>{article.title}</h3>
              </Link>
              <p>by {article.author}</p>
            </div>
          );
        })}
      </section>
    );
  }
};
