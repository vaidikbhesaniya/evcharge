import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { NextLanding } from "./pages/NextLanding";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import MapScreen from "./pages/MapScreen";
// import Navbar from "./components/Navbar";
import { useEffect } from "react";

import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import Emailverify from "./pages/verifications/Emailverify";
import { Store } from "./store/store";
import Profile from "./pages/Profile/Profile";

export const AnimatedRoutes = () => {
    const store = Store();

    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/pricing" element={<NextLanding />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Search" element={<Home />} />
                <Route path="/Map" element={<MapScreen />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/UserVerification" element={<Emailverify />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Profile" element={<Profile />} />
            </Routes>
        </AnimatePresence>
    );
};
