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
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [visibleLog, setVisibleLog] = useState(false);
  const [visibleSign, setVisibleSign] = useState(false);
  const [headCheck, setHeadCheck] = useState(false);
  const [title, setTitle] = useState("");
  const [values, setValues] = useState([0, 100]);
  const [pub, setPub] = useState(false);

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

  const publishParams = { pub, setPub };

  return (
    <Router className="App">
      <Routes>
        <Route
          path="/"
          element={<Home params={params} publishParams={publishParams} />}
        />
        <Route
          element={<Layout params={params} publishParams={publishParams} />}
        >
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup setVisibleSign={setVisibleSign} />}
          />
          <Route
            path="/login"
            element={<Login publishParams={publishParams} />}
          />
          <Route
            path="/publish"
            element={<Publish publishParams={publishParams} />}
          />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>

      {visibleSign && <ModalSignup setVisibleSign={setVisibleSign} />}
      {visibleLog && <ModalLogin setVisibleLog={setVisibleLog} />}
    </Router>
  );
}

export default App;
