import { motion } from "framer-motion";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import pin from "../assets/mapmarker.png";
import { useNavigate } from "react-router-dom";
import { Store } from "../store/store";
import MapboxDirections from "@mapbox/mapbox-sdk/services/directions";
import mapboxgl from "mapbox-gl";

const customIcon = new L.Icon({
    iconUrl: pin, // Add your own marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapScreen = () => {
    const navigate = useNavigate();
    const store = Store();
    const mapRef = useRef();

    const allStations = JSON.parse(localStorage.getItem("stations"));
    const [stations, setStations] = useState([]);
    const directionsClient = useRef(
        MapboxDirections({
            accessToken:
                "sk.eyJ1IjoidmFpZGlrYmhlc2FuaXlhIiwiYSI6ImNsdnhqeXZvNjIyeDAyaXF6cnBza3psNWgifQ.v-66X7gjDpg_dg59_9dgog",
        })
    );
    const [displayedStations, setDisplayedStations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setStations(allStations);
        loadMoreStations();
    }, [allStations]);

    const loadMoreStations = () => {
        const newIndex = currentIndex + 10;
        setDisplayedStations([
            ...displayedStations,
            ...stations.slice(currentIndex, newIndex),
        ]);
        setCurrentIndex(newIndex);
    };
    function handleClickDirection(station) {
        store.setisclickondirection(true);
        const userLocation = [33.885742, -89.852801]; // Replace with actual user location
        console.log(station.latitude, station.longitude);
        directionsClient.current
            .getDirections({
                profile: "driving",
                waypoints: [
                    {
                        coordinates: userLocation,
                    },
                    {
                        coordinates: [
                            parseFloat(station.longitude),
                            parseFloat(station.latitude),
                        ],
                    },
                ],
            })
            .send()
            .then((response) => {
                const route = response.body.routes[0];
                if (route) {
                    const geojson = route.geometry;
                    // Draw the route on the map
                    mapRef.current.addLayer({
                        id: "route",
                        type: "line",
                        source: {
                            type: "geojson",
                            data: {
                                type: "Feature",
                                properties: {},
                                geometry: geojson,
                            },
                        },
                        layout: {
                            "line-join": "round",
                            "line-cap": "round",
                        },
                        paint: {
                            "line-color": "#f00",
                            "line-width": 7,
                            "line-opacity": 0.9,
                        },
                    });
                } else {
                    console.error("No route found");
                }
            })
            .catch((error) => {
                console.error("Error fetching directions:", error);
            });

        store.setlocation([station.latitude, station.longitude]);
    }

    // const displayRoute = (route) => {
    //     const map = mapRef.current;
    //     if (map) {
    //         const geojson = {
    //             type: "Feature",
    //             properties: {},
    //             geometry: {
    //                 type: "LineString",
    //                 coordinates: route,
    //             },
    //         };

    //         // Remove existing route layer if present
    //         const existingRoute = map.getLayer("route");
    //         if (existingRoute) {
    //             map.removeLayer("route");
    //             map.removeSource("route");
    //         }

    //         // Add new route layer
    //         map.addSource("route", {
    //             type: "geojson",
    //             data: geojson,
    //         });

    //         map.addLayer({
    //             id: "route",
    //             type: "line",
    //             source: "route",
    //             layout: {
    //                 "line-join": "round",
    //                 "line-cap": "round",
    //             },
    //             paint: {
    //                 "line-color": "#3887be",
    //                 "line-width": 5,
    //                 "line-opacity": 0.75,
    //             },
    //         });

    //         // Fit map to the route
    //         const bounds = route.reduce((bounds, coord) => {
    //             return bounds.extend(coord);
    //         }, new mapboxgl.LngLatBounds(route[0], route[0]));

    //         map.fitBounds(bounds, {
    //             padding: { top: 50, bottom: 50, left: 50, right: 50 },
    //         });
    //     }
    // };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-screen bg-cosgreen"
        >
            <div className="w-[100%] h-[100%]">
                <MapContainer
                    center={[33.885742, -89.852801]}
                    zoom={10}
                    className="w-full h-full"
                    whenCreated={(mapInstance) => {
                        mapRef.current = mapInstance;
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {displayedStations.map((station, index) => (
                        <Marker
                            key={index}
                            position={[station.latitude, station.longitude]}
                            icon={customIcon}
                        >
                            <Popup>
                                <div>
                                    <h3>{station.stationName}</h3>
                                    <p>{station.stationAddress}</p>
                                    <button
                                        onClick={() =>
                                            handleClickDirection(station)
                                        }
                                    >
                                        Get Directions
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                {currentIndex < stations.length && (
                    <button
                        className="bg-cosgreen text-white px-4 py-2 rounded mt-4"
                        onClick={loadMoreStations}
                    >
                        Load More
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default MapScreen;
