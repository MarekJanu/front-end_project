import "../App.css";
export const Nav = () => {
  return (
    <section className="navbar">
      <a className="active" href="/">
        Home
      </a>
      <a href="/topics/coding">coding</a>
      <a href="/topics/football">football</a>
      <a href="/topics/cooking">cooking</a>
    </section>
  );
};
