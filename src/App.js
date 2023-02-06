import "./App.css";
import { Articles } from "./components/Articles";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Articles />
    </div>
  );
}

export default App;
