import io from "socket.io-client";
import React, { useState, useEffect } from "react";

const socket = io("https://evcharge-backend.onrender.com");
export default function Chat() {
    const [messages, setMessages] = useState<
        { email: string; message: string }[]
    >([]);
    const [inputMessage, setInputMessage] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Prompt user to enter email when they join the chat
        const userEmail = prompt("Please enter your email:");
        if (userEmail) {
            setEmail(userEmail);
            socket.emit("user email", userEmail);
        }

        // Receive the sender's email and socket ID
        socket.on("socketId", ({ email }) => {
            setEmail(email);
        });

        // Receive chat messages
        socket.on("chat message", ({ email, message }) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { email, message },
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== "") {
            socket.emit("chat message", { message: inputMessage });
            setInputMessage("");
        }
    };

    return (
        <div>
            <h1>Welcome to the Chat Room</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.email}:</strong> {msg.message}
                        {msg.email === email && <span> (You)</span>}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
