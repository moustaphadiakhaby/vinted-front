import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ModalSignup from "./components/ModalSignup";
import ModalLogin from "./components/ModalLogin";
import { useState } from "react";
import Layout from "./components/Layout";

function App() {
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleSign, setVisibleSign] = useState(false);
  const [headCheck, setHeadCheck] = useState(false);
  const [title, setTitle] = useState("");
  const [values, setValues] = useState([0, 100]);

  const params = {
    visibleLog,
    setVisibleLog,
    visibleSign,
    setVisibleSign,
    headCheck,
    setHeadCheck,
    title,
    setTitle,
    values,
    setValues,
  };

  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home params={params} />} />
        <Route element={<Layout params={params} />}>
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      {visibleSign && <ModalSignup setVisibleSign={setVisibleSign} />}
      {visibleLog && <ModalLogin setVisibleLog={setVisibleLog} />}
    </Router>
  );
}

export default App;
