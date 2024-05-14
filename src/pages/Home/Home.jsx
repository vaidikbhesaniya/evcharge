import { motion } from "framer-motion";
import { useState } from "react";
import { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Navbar from "../../components/Navbar";
import mapmarker from "../../assets/mapmarker.png";
import station_data from "../../data";
import searchwhite from "../../assets/searchwhite.png";
import stack from "../../assets/stack.png";
import SideBar from "../../components/SideBar";
import { Store } from "../../store/store";
import car from "../../assets/car.jpg";
import { useNavigate } from "react-router-dom";

import directiongreen from "../../assets/directionsgreen.png";
import MapboxDirections from "@mapbox/mapbox-sdk/services/directions";
const Home = () => {
    const store = Store();
    const navigate = useNavigate();
    const station = JSON.parse(localStorage.getItem("stations"));

    useEffect(() => {
        async function userdata() {
            await store.getUser();
        }

        userdata();
    }, []);

    useEffect(() => {
        let offset = 0;

        async function fetchData() {
            const intervalId = setInterval(() => {
                if (offset > 10000) {
                    clearInterval(intervalId); // Clear the interval if offset is greater than 80000
                    console.log("Offset limit reached, stopping the interval.");
                    return;
                }
                store.getstation(offset);
                offset += 1000; // Increase offset by 1000 each second
            }, 1000);
        }
        console.log(store.stations);

        fetchData();
    }, []);

    const themes = [
        "https://api.maptiler.com/maps/basic-v2/style.json?key=x9tTEIbwIYbxGoCgqPmb",
        "https://api.maptiler.com/maps/2269bc1b-be22-4ba7-bccf-f3643b97ed7c/style.json?key=x9tTEIbwIYbxGoCgqPmb",
        "https://api.maptiler.com/maps/satellite/style.json?key=x9tTEIbwIYbxGoCgqPmb",
    ];
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [Mapstyle, setMapstyle] = useState(themes[1]);
    const [searchQuery, setSearchQuery] = useState("");

    const [searchResults, setSearchResults] = useState([]);
    const [isactivesearch, setisactivesearch] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const Searchref = useRef(null);
    const markers = useRef([]);
    const curLocation = { lng: 72.1378992, lat: 21.7433242 };
    const [zoom] = useState(14);
    const mapboxDirectionsClient = useRef(
        MapboxDirections({
            accessToken:
                "sk.eyJ1IjoidmFpZGlrYmhlc2FuaXlhIiwiYSI6ImNsdnhqeXZvNjIyeDAyaXF6cnBza3psNWgifQ.v-66X7gjDpg_dg59_9dgog",
        })
    );

    maptilersdk.config.apiKey = "x9tTEIbwIYbxGoCgqPmb";

    const handlesearch = () => {
        const results = station.filter((station) =>
            station.stationName
                ?.toLowerCase()
                .includes(searchQuery?.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            // console.log(latitude, longitude);
        });
        if (!latitude || !longitude) return;
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: Mapstyle,
            center: [-89.852801, 33.785742],
            zoom: zoom,
        });

        // marker.current = new maptilersdk.Marker({
        //     element: createCustomMarkerElement(),
        //     anchor: "bottom", // Adjust anchor based on your marker design
        // })
        //     .setLngLat([72.1383226, 21.7621129])
        //     .addTo(map.current);

        const addMarker = (lng, lat, id, name) => {
            const markerElement = createCustomMarkerElement();
            const markerObject = new maptilersdk.Marker({
                element: markerElement,
                anchor: "bottom", // Adjust anchor based on your marker design
            })
                .setLngLat([lng, lat])
                .addTo(map.current);

            // Add the new marker object to the array
            markers.current.push({ id, markerObject });
        };
        map.current.on("moveend", () => {
            const bounds = map.current.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();

            // Filter station data based on current map bounds
            const visibleMarkers = station.filter((data, index) => {
                return (
                    data.longitude >= sw.lng &&
                    data.longitude <= ne.lng &&
                    data.latitude >= sw.lat &&
                    data.latitude <= ne.lat
                );
            });
            markers.current.forEach((marker) => marker.markerObject.remove());
            markers.current = [];
            // Add visible markers to the map
            visibleMarkers.forEach((marker, index) => {
                addMarker(
                    marker.longitude,
                    marker.latitude,
                    index,
                    marker.stationName
                );
            });
        });
        return () => {
            markers.current.forEach((marker) => marker.remove());
            markers.current = [];
            if (map.current) {
                map.current.off("moveend", () => {
                    const bounds = map.current.getBounds();
                    const ne = bounds.getNorthEast();
                    const sw = bounds.getSouthWest();

                    // Filter station data based on current map bounds
                    const visibleMarkers = station.filter((data, index) => {
                        return (
                            data.longitude >= sw.lng &&
                            data.longitude <= ne.lng &&
                            data.latitude >= sw.lat &&
                            data.latitude <= ne.lat
                        );
                    });
                    markers.current.forEach((marker) =>
                        marker.markerObject.remove()
                    );
                    markers.current = [];
                    // Add visible markers to the map
                    visibleMarkers.forEach((marker, index) => {
                        addMarker(
                            marker.longitude,
                            marker.latitude,
                            index,
                            marker.stationName
                        );
                    });
                });
            }
        };
    }, [
        zoom,
        latitude,
        longitude,
        curLocation.lng,
        curLocation.lat,
        Mapstyle,
        activeMarker,
        searchResults,
        store.stations,
        station,
    ]);
    const handleSearchResultClick = (lng, lat) => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
            // const origin = [
            //     position.coords.longitude,
            //     position.coords.latitude,
            // ];
            const origin = [-89.852801, 33.785742];
            // if (!isValidCoordinate(lng) || !isValidCoordinate(lat)) {
            //     console.error("Invalid coordinates provided.");
            //     return;
            // }

            const destination = [parseFloat(lng), parseFloat(lat)];

            if (map.current.getLayer("route")) {
                map.current.removeLayer("route");
                map.current.removeSource("route");
            }
            // Ensure both origin and destination are valid coordinates
            // if (!isValidCoordinate(origin) || !isValidCoordinate(destination)) {
            //     console.error("Invalid coordinates provided.");
            //     return;
            // }

            // Make a request to Mapbox Directions API
            map.current.flyTo({ center: [lng, lat], zoom: zoom });
            mapboxDirectionsClient.current
                .getDirections({
                    waypoints: [
                        { coordinates: origin },
                        { coordinates: destination },
                    ],
                    profile: "driving",
                    geometries: "geojson",
                })
                .send()
                .then((response) => {
                    const route = response.body.routes[0];
                    if (route) {
                        const geojson = route.geometry;
                        // Draw the route on the map
                        map.current.addLayer({
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
                                "line-color": "#000000",
                                "line-width": 5,
                                "line-opacity": 0.75,
                            },
                        });
                    } else {
                        console.error("No route found");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching directions:", error);
                });
        });
    };

    // Function to check if coordinates are valid numbers
    const isValidCoordinate = (coord) => {
        return !isNaN(coord) && isFinite(coord);
    };

    const createCustomMarkerElement = () => {
        const markerEl = document.createElement("img");
        markerEl.className = "custom-marker";
        markerEl.src = mapmarker;
        markerEl.style.width = "30px";
        markerEl.style.height = "30px";
        markerEl.style.display = "flex";
        markerEl.style.alignItems = "center";
        markerEl.style.justifyContent = "center";
        markerEl.style.backgroundRepeat = "no-repeat";
        return markerEl;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" w-screen h-[100dvh] bg-cosgreen relative"
        >
            {store.SidebarOpen && (
                <motion.div
                    className="fixed w-full h-full backdrop-blur-md z-[11] "
                    onClick={() => store.setSidebarOpen(false)}
                ></motion.div>
            )}
            {store.SidebarOpen && <SideBar />}
            <div className="bg-cosgreen w-full h-[10%] flex justify-center items-center backdrop-opacity-[0.9]">
                <div className="w-[20%] h-full justify-center items-center flex">
                    <img
                        src={stack}
                        alt=""
                        onClick={() => store.setSidebarOpen(!store.SidebarOpen)}
                        className="w-[30px]"
                    />
                </div>
                <motion.p
                    className={`text-coswhite  justify-center items-center h-full w-[70%]  poppins-medium font-3xl ${
                        isactivesearch ? "hidden" : "flex"
                    }`}
                >
                    EV Charging Point
                </motion.p>
                <motion.div
                    initial={{ scale: isactivesearch ? 0 : 1 }}
                    animate={{ scale: isactivesearch ? 1 : 0 }}
                    exit={{ scale: isactivesearch ? 1 : 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className={`${
                        isactivesearch ? "flex" : "hidden"
                    } w-[70%] h-full justify-center items-center`}
                >
                    <input
                        placeholder="Search Station"
                        ref={Searchref}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="outline-none w-full h-full bg-transparent text-coswhite poppins-medium"
                    />
                </motion.div>

                <div className="flex justify-center items-center w-[30%]">
                    <img
                        src={searchwhite}
                        onClick={() => {
                            if (searchQuery != "") {
                                handlesearch();
                            } else {
                                setisactivesearch(!isactivesearch);
                            }
                            if (Searchref.current) {
                                Searchref.current.focus();
                            }
                        }}
                        alt=""
                        className="w-[30px]"
                    />
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={mapContainer}
                className="absolute w-full h-[80%]"
            >
                <div className="w-full h-[40%] flex justify-center items-center  absolute z-[11] bottom-0">
                    <div
                        id="slider"
                        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
                    >
                        {searchResults &&
                            searchResults?.map((item, key) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    key={key}
                                    className="w-[70%] h-[90%] text-white inline-block  cursor-pointer hover:scale-105 ease-in-out duration-300 bg-cosgreen m-2 p-3 rounded-2xl justify-center items-center mt-3"
                                >
                                    <div className="w-full h-full flex-col flex justify-center items-center">
                                        <div className="w-[95%] h-[70%]  rounded-2xl mb-2 overflow-hidden justify-center items-center flex">
                                            <img
                                                onClick={() =>
                                                    navigate(
                                                        `/station/${item.id}`
                                                    )
                                                }
                                                src={car}
                                                alt=""
                                                className="w-[150px]"
                                            />
                                        </div>
                                        <div className="w-[95%] h-[20%]  text-[10px] flex flex-row">
                                            <div
                                                className="flex flex-col w-[80%] h-full
                                            "
                                            >
                                                <p className="">
                                                    {item.stationName}
                                                </p>
                                                <p className=" truncate">
                                                    {item.stationAddress}
                                                </p>
                                            </div>
                                            <div className="flex flex-col w-[20%] justify-center items-center text-[20px]">
                                                <div className="bg-coswhite w-[40px] h-[40px] rounded-full">
                                                    <img
                                                        onClick={() =>
                                                            handleSearchResultClick(
                                                                item.longitude,
                                                                item.latitude
                                                            )
                                                        }
                                                        src={directiongreen}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </motion.div>

            <Navbar />
        </motion.div>
    );
};

export default Home;
