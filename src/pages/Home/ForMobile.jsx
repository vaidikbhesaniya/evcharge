// import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Navbar from "../../components/Navbar";
import station_data from "../../lib/stations";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import petrolmarker from "../../assets/petrolmarker.png";
import mapmarker from "../../assets/mapmarker.png";
import logo from "../../assets/logo.png";
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
    0;

    useEffect(() => {
        let offset = 0;

        async function fetchData() {
            const intervalId = setInterval(() => {
                if (offset > 2800) {
                    clearInterval(intervalId); // Clear the interval if offset is greater than 80000
                    console.log("Offset limit reached, stopping the interval.");
                    return;
                }
                store.getstation(offset);
                offset += 1000; // Increase offset by 1000 each second

                // console.log(store.stations);
            }, 1000);
            // setstationsall(store.stations);
        }

        fetchData();
    }, []);
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
            <div className="w-[100vw] h-[100vh] bg-primary">
                <div>
                    <div className="w-[100vw] h-[10vh] z-[1111]">
                        {store.issearch ? (
                            <div>
                                <input
                                    className="w-[80%] h-[100%] bg-primary z-[1111] outline-none"
                                    placeholder="Search for stations..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                <button className="w-[20%] h-[100%] z-[1111]">
                                    search
                                </button>
                            </div>
                        ) : (
                            <div className="w-[100vw] h-[10vh] flex flex-col">
                                <div className="w-[100vw] h-[2vh] bg-white"></div>
                                <div className="w-[100vw] h-[8vh] flex flex-col items-center justify-center">
                                    <img
                                        src={logo}
                                        className="w-[170px]"
                                        alt=""
                                    />
                                </div>
                            </div>
                        )}
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
                                            `/station/${parseInt(station.id)}`
                                        );
                                    }}
                                >
                                    {station.stationName}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Map
                    className={`w-[100%]  ${
                        store.issearch ? "h-[80%]" : "h-[80%]"
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
