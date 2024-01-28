import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resource />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/games" element={<Games />} />
        <Route path="/dungeons" element={<Dungeons />}/>
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
