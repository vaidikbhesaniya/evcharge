import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { NextLanding } from "./pages/NextLanding";
// import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import MapScreen from "./pages/MapScreen";
// import Navbar from "./components/Navbar";
import { useEffect } from "react";

import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import Emailverify from "./pages/verifications/Emailverify";
import { Store } from "./store/store";
import Profile from "./pages/Profile/Profile";
import StationDetail from "./pages/StationDetail/StationDetail";
import AllStations from "./pages/AllStations/AllStations";
import Bookmark from "./pages/Bookmark/Bookmark";
import Chat from "./pages/Chat";
import ForMobile from "./pages/Home/ForMobile";
export const AnimatedRoutes = () => {
    const store = Store();
    const navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        // if (store.user) {
        //     navigate("/home");
        // }
        // store.get
        // console.log(store.user);

        async function datafetch() {
            await store.getUser(navigate);
        }
        datafetch();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<NextLanding />} />
            <Route path="/Home" element={<ForMobile />} />
            <Route path="/Search" element={<ForMobile />} />
            <Route path="/Map" element={<ForMobile />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/UserVerification" element={<Emailverify />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stations" element={<AllStations />} />
            <Route path="/station/:stationId" element={<StationDetail />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/chat" element={<Chat />}></Route>
        </Routes>
        //
    );
};
