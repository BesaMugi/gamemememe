import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Resource from "./pages/Resources/resource";
import Materials from "./pages/Materials/materials";
import Games from "./pages/Games/games";
import Dungeons from "./pages/Dungeons/dungeons";
import ShopApp from "./pages/Shop/shopApp";
import Shop from "./pages/Shop/shop";
import Upgrades from "./pages/Upgrades/upgrades";
import Tools from "./pages/Shop/Tools/tools";
import Weapons from "./pages/Shop/Weapons/weapons";
import Workers from "./pages/Shop/Workers/workers";
import Login from "./components/Authorization/login";
import Registration from "./components/Authorization/registration";
import Home from "./components/Home/home";
import User from "./pages/User/user";

function App() {
  const token = useSelector((state) => state.application.token);

  return !token ? (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Navigate to="/" />} />
        <Route path="/resources" element={<Navigate to="/" />} />
        <Route path="/materials" element={<Navigate to="/" />} />
        <Route path="/games" element={<Navigate to="/" />} />
        <Route path="/dungeons" element={<Navigate to="/" />} />
        <Route path="/shopApp" element={<Navigate to="/" />} />
        <Route path="/shop" element={<Navigate to="/" />} />
        <Route path="/upgrades" element={<Navigate to="/" />} />
        <Route path="/tools" element={<Navigate to="/" />} />
        <Route path="/weapons" element={<Navigate to="/" />} />
        <Route path="/workers" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/auth" element={<Navigate to="/profile" />} />
        <Route path="/login" element={<Navigate to="/profile" />} />
        <Route path="/profile" element={<User />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/games" element={<Games />} />
        <Route path="/dungeons" element={<Dungeons />} />
        <Route path="/shopApp" element={<ShopApp />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/upgrades" element={<Upgrades />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/workers" element={<Workers />} />
      </Routes>
    </Router>
  );
}

export default App;
