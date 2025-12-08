import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/login/Login";
import Layout from "./views/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
