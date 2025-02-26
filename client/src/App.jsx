import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import CreateChallenge from "./pages/CreateChallenge/CreateChallenge";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Marketplace from "./pages/Marketplace";
import RewardToken from "./pages/RewardToken";
import LearningNFT from "./pages/LearningNFT";
import LoginPopup from "./pages/AuthGuard/LoginPopup";
import ChallengeCollection from "./pages/ChallengeCollection/ChallengeCollection.jsx";
import Dash from "./pages/Dashboard/Dash.jsx";
import EditChallenge from "./pages/EditChallenge/EditChallenge.jsx";
import DeleteChallenge from "./pages/DeleteChallenge/DeleteChallenge.jsx";
import ShowChallenge from "./components/ShowChallenge.jsx";

function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  return (
    <>
      <ToastContainer />
      {loginPopup ? <LoginPopup setLoginPopup={setLoginPopup} /> : ""}
      <div className="app">
        <Navbar setLoginPopup={setLoginPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-challenge" element={<CreateChallenge />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/challenges/:id" element={<ChallengeCollection />} />
          <Route path="/challenges/show/:id" element={<ShowChallenge />} />
          <Route path="/challenges/edit/:id" element={<EditChallenge />} />
          <Route path="/challenges/delete/:id" element={<DeleteChallenge />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/reward-token" element={<RewardToken />} />
          <Route path="/learning-nft" element={<LearningNFT />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
