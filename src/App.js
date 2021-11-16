import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import ViewGame from './pages/ViewGame'
import Navi from "./components/Navi";

function App() {
  return (
    <div>
      <Navi />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ViewGame />} />
      </Routes>
    </div>
  );
}

export default App;
