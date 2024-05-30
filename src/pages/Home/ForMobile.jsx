// import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Navbar from "../../components/Navbar";
import station_data from "../../lib/stations";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { createRoot } from "react-dom/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import petrolmarker from "../../assets/petrolmarker.png";
import mapmarker from "../../assets/mapmarker.png";
import {
    APIProvider,
    Map,
    Marker,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";
import { Store } from "../../store/store";

const ForMobile = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStations, setFilteredStations] = useState(station_data);
    const store = Store();
    const getMarkerIcon = (type) => {
        switch (type) {
            case "ev":
                return mapmarker; // Blue marker for EV stations
            case "cng":
                return petrolmarker; // Yellow marker for CNG stations
            default:
                return mapmarker; // Default marker for other stations
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const filtered = station_data.filter((station) =>
            station.stationName
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setFilteredStations(filtered);
    };

    return (
        <APIProvider
            apiKey={"AIzaSyDIj9ZhXRQX7XsTB14AhZvUcVItytgSYRc"}
            onLoad={() => console.log("Maps API has loaded.")}
        >
            <div className="w-[100vw] h-[100vh]">
                {store.issearch && (
                    <div>
                        <div className="w-[100vw] h-[7vh] z-[1111]">
                            <input
                                className="w-[80%] h-[100%] z-[1111] outline-none"
                                placeholder="Search for stations..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <button className="w-[20%] h-[100%] z-[1111]">
                                search
                            </button>
                        </div>
                        {store.issearch && searchQuery && (
                            <div className="absolute  left-0 w-full bg-white z-[1111] max-h-[20%] overflow-y-auto">
                                {filteredStations.map((station, index) => (
                                    <div
                                        key={index}
                                        className="p-2 border-b cursor-pointer"
                                        onClick={() => {
                                            // Center the map on the selected station

                                            navigate(
                                                `/station/${parseInt(
                                                    station.id
                                                )}`
                                            );
                                        }}
                                    >
                                        {station.stationName}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <Map
                    className={`w-[100%]  ${
                        store.issearch ? "h-[83%]" : "h-[90%]"
                    }`}
                    defaultZoom={13}
                    defaultCenter={{ lat: 35.362213, lng: -94.375338 }}
                    onCameraChanged={(ev) =>
                        console.log(
                            "camera changed:",
                            ev.detail.center,
                            "zoom:",
                            ev.detail.zoom
                        )
                    }
                >
                    {station_data
                        .filter((station) =>
                            station.stationName
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                        )
                        .map((station, index) => (
                            <Marker
                                key={index}
                                position={{
                                    lat: parseFloat(station.latitude),
                                    lng: parseFloat(station.longitude),
                                }}
                                title={
                                    station.stationName
                                        ? station.stationName
                                        : "Station Name Not Found"
                                }
                                options={{
                                    icon: {
                                        url: getMarkerIcon(station.type),
                                        scaledSize: { width: 32, height: 32 },
                                    },
                                }}
                                onClick={() => {
                                    navigate(
                                        `/station/${parseInt(station.id)}`
                                    );
                                }}
                            ></Marker>
                        ))}
                </Map>
                <Navbar />
            </div>
        </APIProvider>
    );
};

export default ForMobile;
