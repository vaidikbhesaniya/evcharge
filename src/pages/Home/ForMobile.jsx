import Navbar from "../../components/Navbar";
import station_data from "../../lib/stations";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import petrolmarker from "../../assets/petrolmarker.png";

import "@maptiler/sdk/dist/maptiler-sdk.css";
import mapmarker from "../../assets/mapmarker.png";
import logo from "../../assets/logo.png";
import SideBar from "../../components/SideBar";
import { motion, AnimatePresence } from "framer-motion";
import stack from "../../assets/stack.png";
// import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Store } from "../../store/store";
// import spin from "../../assets/spin.gif";

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api";
// import { useState } from "react";
import Popup from "../../components/Popup";
// import MapboxDirections from "@mapbox/mapbox-sdk/services/directions";
const ForMobile = () => {
    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState(null);
    const [map, setMap] = useState(null);
    const evStations = station_data.filter((station) => station.type === "ev");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStations, setFilteredStations] = useState(station_data);
    // const [loading, setLoading] = useState(true); // Add loading state
    const [selectedStation, setSelectedStation] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const handlesearch = () => {
        const results = filteredStations.filter((station) =>
            station.stationName
                ?.toLowerCase()
                .includes(searchQuery?.toLowerCase())
        );
        setFilteredStations(results);
    };

    const store = Store();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDIj9ZhXRQX7XsTB14AhZvUcVItytgSYRc",
        libraries: ["places"],
    });

    // useEffect(() => {
    //     // Function to hide the AreaPopup component after 10 seconds
    //     const hideAreaPopup = () => {
    //         setTimeout(() => {
    //             setSelectedStation(null);
    //         }, 10000); // 10 seconds
    //     };

    //     // Call the function to hide the AreaPopup component
    //     hideAreaPopup();

    //     // Cleanup function to clear the timeout when the component unmounts
    //     return () => clearTimeout(hideAreaPopup);
    // }, []); // Execute when selectedArea changes

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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting current location", error);
                }
            );
        }
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

    async function calculateRoute(lat, lng) {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: { lat: 35.362213, lng: -94.375338 },
            destination: { lat: lat, lng: lng },
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    function clearRoute() {
        setDirectionsResponse(null);
        setDistance("");
        setDuration("");
    }

    return (
        <div>
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
                                    {/* <Autocomplete> */}
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
                                    {/* </Autocomplete> */}
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

                <GoogleMap
                    ref={map}
                    className={`w-[100%]  ${
                        store.issearch ? "h-[73%]" : "h-[80%]"
                    }`}
                    zoom={13}
                    center={{ lat: 35.362213, lng: -94.375338 }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    gestureHandling="auto"
                    mapContainerStyle={{
                        width: "100%",
                        height: `${store.issearch ? "73%" : "80%"}`,
                    }}
                    onLoad={(map) => setMap(map)}
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

                    {directionsResponse && (
                        <DirectionsRenderer
                            directions={directionsResponse}
                            options={{
                                polylineOptions: {
                                    strokeColor: "red", // Change this to the desired color
                                    strokeOpacity: 1.0,
                                    strokeWeight: 5,
                                },
                                suppressMarkers: true,
                                suppressInfoWindows: true,
                            }}
                        />
                    )}
                </GoogleMap>

                {selectedStation && (
                    <AnimatePresence>
                        <Popup
                            station={selectedStation}
                            distance={distance}
                            duration={duration}
                            handledirection={() =>
                                calculateRoute(
                                    parseFloat(selectedStation.latitude),
                                    parseFloat(selectedStation.longitude)
                                )
                            }
                            handleremove={() => clearRoute()}
                            onClose={() => setSelectedStation(null)}
                        />
                    </AnimatePresence>
                )}
                <Navbar />
            </div>
        </div>
    );
};

export default ForMobile;
