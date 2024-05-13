import { motion } from "framer-motion";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapScreen = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tokyo = { lng: 139.753, lat: 35.6844 };
    const [zoom] = useState(14);
    maptilersdk.config.apiKey = "x9tTEIbwIYbxGoCgqPmb";

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [tokyo.lng, tokyo.lat],
            zoom: zoom,
        });
    }, [tokyo.lng, tokyo.lat, zoom]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" w-screen h-screen bg-cosgreen relative"
        >
            <div ref={mapContainer} className="absolute w-full h-full"></div>
        </motion.div>
    );
};

export default MapScreen;
