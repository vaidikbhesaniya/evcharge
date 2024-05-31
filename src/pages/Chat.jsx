import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store } from "../store/store";
import data from "../assets/profile/back.png";

const socket = io("https://evcharge-backend.onrender.com");

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const store = Store();
    const [inputMessage, setInputMessage] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        requestNotificationPermission();

        const userEmail = store?.user?.userName;
        if (userEmail) {
            setEmail(userEmail);
            socket.emit("user email", userEmail);
        }

        socket.on("socketId", ({ email }) => {
            setEmail(email);
        });

        socket.on("chat message", ({ email, message }) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { email, message },
            ]);
            triggerNotification(message);
        });

        socket.on("user count", (count) => {
            setUserCount(count);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const requestNotificationPermission = () => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    console.log("Notification permission granted");
                }
            });
        }
    };

    const triggerNotification = (message) => {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("New Message", {
                body: message,
                icon: data,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== "") {
            socket.emit("chat message", { message: inputMessage });
            setInputMessage("");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-4">
                Welcome to the Chat Room
            </h1>
            <p className="text-gray-600 mb-2">Users in room: {userCount}</p>
            <div className="space-y-2">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className={`flex ${
                                msg.email === email
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`bg-gray-200 rounded-md p-2 ${
                                    msg.email === email ? "ml-auto" : "mr-auto"
                                }`}
                            >
                                <strong className="font-semibold">
                                    {msg.email}:
                                </strong>
                                <span className="ml-2">{msg.message}</span>
                                <p className="text-xs text-gray-500">
                                    {new Date()
                                        .toLocaleTimeString()
                                        .slice(0, 5)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow border-gray-300 border rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 transition-colors"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
