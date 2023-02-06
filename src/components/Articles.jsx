import { getArticles } from "./utils/api";

export const Articles = () => {
  getArticles();
  return (
    <section>
      <ul>
        <li key={"put id here"}>{}</li>
      </ul>
    </section>
  );
};
