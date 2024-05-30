// import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Navbar from "../../components/Navbar";
import station_data from "../../lib/stations";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { createRoot } from "react-dom/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    APIProvider,
    Map,
    Marker,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";

const ForMobile = () => {
    const navigate = useNavigate();

    return (
        <APIProvider
            apiKey={"AIzaSyDIj9ZhXRQX7XsTB14AhZvUcVItytgSYRc"}
            onLoad={() => console.log("Maps API has loaded.")}
        >
            <div className="w-[100vw] h-[100vh]">
                <Map
                    className="w-[100%] h-[90%]"
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
                    {station_data.map((station, index) => (
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
                            onClick={() => {
                                navigate(`/station/${parseInt(station.id)}`);
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
