import Navbar from "../../components/Navbar";
import station_data from "../../lib/stations";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import petrolmarker from "../../assets/petrolmarker.png";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import mapmarker from "../../assets/mapmarker.png";
import logo from "../../assets/logo.png";
import SideBar from "../../components/SideBar";
import { motion, AnimatePresence } from "framer-motion";
import stack from "../../assets/stack.png";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Store } from "../../store/store";
import spin from "../../assets/spin.gif";
import Popup from "../../components/Popup";
import MapboxDirections from "@mapbox/mapbox-sdk/services/directions";
const ForMobile = () => {
    const navigate = useNavigate();
    const map = useRef(null);
    const evStations = station_data.filter((station) => station.type === "ev");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStations, setFilteredStations] = useState(station_data);
    const [loading, setLoading] = useState(true); // Add loading state
    const [selectedStation, setSelectedStation] = useState(null);

    const handlesearch = () => {
        const results = filteredStations.filter((station) =>
            station.stationName
                ?.toLowerCase()
                .includes(searchQuery?.toLowerCase())
        );
        setFilteredStations(results);
    };

    const mapboxDirectionsClient = useRef(
        MapboxDirections({
            accessToken:
                "sk.eyJ1IjoidmFpZGlrYmhlc2FuaXlhIiwiYSI6ImNsdnhqeXZvNjIyeDAyaXF6cnBza3psNWgifQ.v-66X7gjDpg_dg59_9dgog",
        })
    );
    const store = Store();

    const handleremovedirection = () => {
        // setDirections(null);

        if (map.current.getLayer("route")) {
            map.current.removeLayer("route");
            map.current.removeSource("route");
        }
    };
    const handleSearchResultClick = (lng, lat) => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
            // const origin = [
            //     position.coords.longitude,
            //     position.coords.latitude,
            // ];
            const origin = [-89.852801, 33.885742];
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
        });
    };

    useEffect(() => {
        // Function to hide the AreaPopup component after 10 seconds
        const hideAreaPopup = () => {
            setTimeout(() => {
                setSelectedStation(null);
            }, 10000); // 10 seconds
        };

        // Call the function to hide the AreaPopup component
        hideAreaPopup();

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(hideAreaPopup);
    }, []); // Execute when selectedArea changes

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
            onLoad={() => setLoading(false)} // Set loading to false when map loads
        >
            {" "}
            {store.SidebarOpen && (
                <motion.div
                    className="fixed w-full h-full backdrop-blur-md z-[11] "
                    onClick={() => store.setSidebarOpen(false)}
                ></motion.div>
            )}
            {store.SidebarOpen && <SideBar />}
            <div className="w-[100vw] h-[100vh] bg-primary">
                <div>
                    <div
                        className={`${
                            store.issearch ? "h-[17vh]" : " h-[10vh]"
                        } w-[100vw] z-[1111]`}
                    >
                        <div
                            className={` ${
                                store.issearch ? "h-[17vh]" : " h-[10vh]"
                            } w-[100vw] flex flex-col`}
                        >
                            <div className="w-[100vw] h-[2vh] bg-white"></div>
                            <div className="w-[100vw] h-[8vh] flex flex-row">
                                <div className="w-[20%] flex justify-center items-center">
                                    <img
                                        onClick={() =>
                                            store.setSidebarOpen(
                                                !store.SidebarOpen
                                            )
                                        }
                                        src={stack}
                                        alt=""
                                        className="w-[50%] h-[50%]"
                                    />
                                </div>
                                <div className="w-[80%] justify-center  flex items-center">
                                    <img
                                        src={logo}
                                        className="w-[170px]"
                                        alt=""
                                    />
                                </div>
                            </div>
                            {store.issearch && (
                                <div className="w-[100vw] h-[7vh] flex flex-row justify-center items-center">
                                    <input
                                        className="w-[80%] h-[100%] m-2 bg-primary z-[1111] outline-none placeholder:text-[white] text-cosgreen"
                                        placeholder="Search for stations..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handlesearch();
                                            }
                                        }}
                                    />
                                    <button className="w-[20%] h-[100%] z-[1111]">
                                        search
                                    </button>
                                </div>
                            )}
                        </div>
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

                {loading ? ( // Conditionally render the loader
                    <div className=" bg-white flex justify-center items-center h-full">
                        <img src={spin} alt="" />
                    </div>
                ) : (
                    <Map
                        ref={map}
                        className={`w-[100%]  ${
                            store.issearch ? "h-[73%]" : "h-[80%]"
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
                        {evStations
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
                                            scaledSize: {
                                                width: 32,
                                                height: 32,
                                            },
                                        },
                                    }}
                                    onClick={() => {
                                        // navigate(
                                        //     `/station/${parseInt(station.id)}`
                                        // );
                                        setSelectedStation(
                                            evStations.find(
                                                (s) => s.id === station.id
                                            )
                                        );
                                    }}
                                ></Marker>
                            ))}
                    </Map>
                )}
                {selectedStation && (
                    <AnimatePresence>
                        <Popup
                            station={selectedStation}
                            handledirection={() =>
                                handleSearchResultClick(
                                    selectedStation.longitude,
                                    selectedStation.latitude
                                )
                            }
                            handleremove={() => handleremovedirection()}
                            onClose={() => setSelectedStation(null)}
                        />
                    </AnimatePresence>
                )}
                <Navbar />
            </div>
        </APIProvider>
    );
};

export default ForMobile;
