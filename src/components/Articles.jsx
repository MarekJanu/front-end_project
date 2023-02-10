import { getArticles } from "./utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const articlePath = "/articles/";

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
              <Link
                to={articlePath + article.article_id}
                className="frontPgTitle"
              >
                <img className="imgIMG" src={article.article_img_url} />
                <h3>{article.title}</h3>
                <span className="spanVotes">
                  comments {article.comment_count}&nbsp;votes {article.votes}
                </span>
              </Link>
              <p>
                {/* user/author avatar placeholder  */}
                <img
                  src="https://www.vhv.rs/dpng/d/42-427985_icon-transparent-avatar-png-png-download.png"
                  className="imgAvatarPg"
                />
                &nbsp; {article.author}
              </p>
            </div>
          );
        })}
      </section>
    );
  }
};
