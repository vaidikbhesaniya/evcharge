import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Store } from "../../store/store";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
function Bookmark() {
    // const [bookmarkedStations, setBookmarkedStations] = useState([]);
    // const cardsRef = useRef([]);
    const navigate = useNavigate();
    const store = Store();

    // const stations = JSON.parse(localStorage.getItem("stations")) || [];
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    // setBookmarkedStations(bookmarks);
    // console.log(bookmarks, bookmarkedStations);

    const handleRemoveBookmark = async (stationId) => {
        const query = {
            stationId: parseInt(stationId),
        };
        await store.removebookmark(query);
        await store.getbookmark();
        // console.log("====================================");
        // console.log(stationId);
        // console.log("====================================");
    };

    return (
        <div className="p-6">
            {bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {bookmarks.map((station, index) => (
                        <div
                            key={station.id}
                            // ref={(el) => (cardsRef.current[index] = el)}
                            className="relative bg-white p-6 rounded-lg shadow-lg"
                        >
                            <button
                                onClick={() => handleRemoveBookmark(station.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>

                            <h3
                                className="text-xl font-semibold mb-2"
                                onClick={() =>
                                    navigate(`/station/${station.id}`)
                                }
                            >
                                {station.stationName}
                            </h3>
                            <p className="text-gray-700">
                                {station.stationAddress}
                            </p>
                            {station.latitude && station.longitude && (
                                <p className="text-gray-500">
                                    Lat: {station.latitude}, Lon:{" "}
                                    {station.longitude}
                                </p>
                            )}
                            {station.category && (
                                <p className="text-gray-500">
                                    Category: {station.category}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-700">
                    No bookmarked stations available.
                </p>
            )}
        </div>
    );
}

export default Bookmark;
