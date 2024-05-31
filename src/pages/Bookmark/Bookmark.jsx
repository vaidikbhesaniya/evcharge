import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Store } from "../../store/store";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
function Bookmark() {
    const navigate = useNavigate();
    const store = Store();
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const handleRemoveBookmark = async (stationId) => {
        const query = {
            stationId: parseInt(stationId),
        };
        await store.removebookmark(query);
        await store.getbookmark();
    };

    return (
        <div className=" bg-cosgreen h-screen w-screen ">
            <div className="w-[100%] h-[90%]">
                {bookmarks.length > 0 ? (
                    <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {bookmarks.map((station, index) => (
                            <SwipableCard
                                key={station.id}
                                station={station}
                                onRemove={handleRemoveBookmark}
                                navigate={navigate}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-white poppins-medium w-[100%] h-[90%] flex justify-center items-center ">
                        No bookmarked stations available.
                    </div>
                )}
            </div>
            <Navbar />
        </div>
    );
}

const SwipableCard = ({ station, onRemove, navigate }) => {
    const handlers = useSwipeable({
        onSwipedLeft: () => onRemove(station.id),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div
            {...handlers}
            className="relative bg-primary p-6 rounded-lg shadow-lg text-white-400"
        >
            <button
                onClick={() => onRemove(station.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
                ×
            </button>

            <h3
                className="text-xl font-semibold mb-2"
                onClick={() => navigate(`/station/${station.id}`)}
            >
                {station.stationName}
            </h3>
            <p className="text-gray-200">{station.stationAddress}</p>
            {station.latitude && station.longitude && (
                <p className="text-gray-200">
                    Lat: {station.latitude}, Lon: {station.longitude}
                </p>
            )}
            {station.category && (
                <p className="text-gray-200">Category: {station.category}</p>
            )}
        </div>
    );
};

SwipableCard.propTypes = {
    station: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default Bookmark;
