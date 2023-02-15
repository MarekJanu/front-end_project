import { getArticles, getUsers } from "./utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";
import { Loading } from "./Loading";
import { Alert } from "@mui/material";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [sortValue, setSortValue] = useState("created_at");
  const [orderOfSort, setOrderOfSort] = useState("DESC");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const articlePath = "/articles/";

  useEffect(() => {
    Promise.all([getArticles(topic, sortValue, orderOfSort), getUsers()])

      .then(([articles, users]) => {
        setArticles(articles);
        setIsLoading(false);
        setError(null);
        setUsers(users);
      })
      .catch((err) => setError("No topic found, try something diffrent..."));
  }, [topic, sortValue, orderOfSort]);

  let newObj = {};
  users.forEach((user) => (newObj[user.username] = user.avatar_url));

  const handleSorting = ({ target: { value } }) => {
    setSortValue(value);
  };
  const handleOrder = () => {
    if (orderOfSort === "DESC") setOrderOfSort("ASC");
    if (orderOfSort === "ASC") setOrderOfSort("DESC");
  };
  const testTest = (arg) => {
    const arrowSignObj = { ASC: "˄", DESC: "˅" };
    return arrowSignObj[arg];
  };

  if (error) return <h2>{error}</h2>;
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <span className="darkSpan"> sorting :&nbsp;</span>
        <select className="someSelect" onChange={(e) => handleSorting(e)}>
          <option disabled>sort by</option>
          <option value="created_at">date</option>
          <option value="votes">votes</option>
          <option value="comment_count">comments</option>
        </select>
        &nbsp;
        <button className="randomButton" onClick={(e) => handleOrder(e)}>
          {testTest(orderOfSort)}
        </button>
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
                <p className="specialP">
                  by {article.author}, published:{" "}
                  {article.created_at.slice(0, 10)}
                </p>
              </div>
            );
          })}
        </section>
      </>
    );
  }
};
