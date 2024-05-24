// import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
//
// axios.defaults.baseURL = "https://evcharge-backend.vercel.app";
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://evcharge-backend.onrender.com";
// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />

        <Toaster />
        <ToastContainer position="bottom-left" autoClose={2000} theme="dark" />
    </BrowserRouter>
);
