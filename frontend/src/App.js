import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import UploadForm from "./components/UploadForm";
import DataList from "./components/DataList";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Upload Form</Link>
            </li>
            <li>
              <Link to="/data">View Data</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/data" element={<DataList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
