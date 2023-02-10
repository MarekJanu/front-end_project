import { getArticles } from "./utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";
import { TestComponent } from "./TestComponent";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [sortValue, setSortValue] = useState("created_at");
  const [orderOfSort, setOrderOfSort] = useState("DESC");
  const [isLoading, setIsLoading] = useState(true);
  const articlePath = "/articles/";

  useEffect(() => {
    getArticles(topic, sortValue, orderOfSort).then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, [topic]);
  const handleSorting = (e) => {
    e.preventDefault();
    setSortValue();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <select onChange={(e) => console.log(e.target.value)}>
          <option disabled>sort by</option>
          <option value="created_at">date</option>
          <option value="votes">votes</option>
          <option value="comments">comments</option>
        </select>
        <button onClick={() => console.log("click")}>↕</button>
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
      </>
    );
  }
};
