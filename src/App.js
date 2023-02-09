import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Login from "./pages/Login";
import ModalSignup from "./components/ModalSignup";
import ModalLogin from "./components/ModalLogin";
import { useState } from "react";

function App() {
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleSign, setVisibleSign] = useState(false);
  console.log(visibleLog);
  return (
    <Router className="App">
      <Header
        visibleLog={visibleLog}
        setVisibleLog={setVisibleLog}
        visibleSign={visibleSign}
        setVisibleSign={setVisibleSign}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {visibleSign && <ModalSignup setVisibleSign={setVisibleSign} />}
      {visibleLog && <ModalLogin setVisibleLog={setVisibleLog} />}
    </Router>
  );
}

export default App;
