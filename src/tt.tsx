import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
