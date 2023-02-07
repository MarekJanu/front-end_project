import { Link } from "react-router-dom";
import "../App.css";
export const Nav = () => {
  return (
    <section className="navbar">
      <Link to="/" className="active">
        Home
      </Link>
      <Link to="/topics/coding">coding</Link>
      <Link to="/topics/football">football</Link>
      <Link to="/topics/cooking">cooking</Link>
    </section>
  );
};
