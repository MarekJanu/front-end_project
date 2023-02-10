import { Link } from "react-router-dom";
import "../App.css";
export const Nav = () => {
  return (
    <>
      <section className="navbar">
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/topics/coding">coding</Link>
        <Link to="/topics/football">football</Link>
        <Link to="/topics/cooking">cooking</Link>
        <select onChange={(e) => console.log(e.target.value)}>
          <option disabled>sort by</option>
          <option value="date">date</option>
          <option value="votes">votes</option>
          <option value="comments">comments</option>
        </select>
        <button onClick={() => console.log("click")}>↕</button>
      </section>
    </>
  );
};
