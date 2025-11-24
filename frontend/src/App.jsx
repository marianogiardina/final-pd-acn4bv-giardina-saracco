import { Link, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
