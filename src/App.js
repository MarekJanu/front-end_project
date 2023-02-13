import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Articles } from "./components/Articles";
import { SingleArticle } from "./components/SingleArticle";
import { ErrorPage } from "./components/ErrorPage";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("App");
  return (
    <div className={`${mode}`}>
      <Header />
      <Nav mode={mode} setMode={setMode} />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
        <Route path="/articles/:id" element={<SingleArticle />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
