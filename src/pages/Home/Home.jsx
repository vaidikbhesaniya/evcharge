import { motion, AnimatePresence } from "framer-motion";
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
import spin from "../../assets/spin.gif";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import gsap from "gsap";
import directiongreen from "../../assets/directionsgreen.png";
import AreaPopup from "../../components/AreaPopup";
import MapboxDirections from "@mapbox/mapbox-sdk/services/directions";
import opencage from "opencage-api-client";
import nearby from "../../assets/nearby.png";
import back from "../../assets/profile/back.png";
import petrolmarker from "../../assets/petrolmarker.png";

const Home = () => {
 
    const store = Store();
    const navigate = useNavigate();
    const stations = JSON.parse(localStorage.getItem("stations"));

    const filterStations = (stations) => {
        const uniqueStations = new Map();
        stations.forEach((station) => {
            const { latitude, longitude } = station;
            const key = `${latitude}-${longitude}`;
            if (!uniqueStations.has(key)) {
                uniqueStations.set(key, station);
            }
        });
        return Array.from(uniqueStations.values());
    };

    const station = stations ? filterStations(stations) : null;

    // const [stationsall, setstationsall] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function userdata() {
            await store.getUser(navigate);
        }

        userdata();
    }, []);

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

    const themes = [
        "https://api.maptiler.com/maps/basic-v2/style.json?key=x9tTEIbwIYbxGoCgqPmb",
        "https://api.maptiler.com/maps/outdoor-v2/style.json?key=x9tTEIbwIYbxGoCgqPmb",
        "https://api.maptiler.com/maps/2269bc1b-be22-4ba7-bccf-f3643b97ed7c/style.json?key=x9tTEIbwIYbxGoCgqPmb",
        "https://api.maptiler.com/maps/satellite/style.json?key=x9tTEIbwIYbxGoCgqPmb",
    ];
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [Mapstyle, setMapstyle] = useState(themes[2]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStation, setSelectedStation] = useState(null);
    const [selectedArea, setselectedArea] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isactivesearch, setisactivesearch] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const Searchref = useRef(null);
    const markers = useRef([]);
    const fuelmarkers = useRef([]);
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

        setLoading(true);
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: Mapstyle,
            center: [-89.852801, 33.785742],
            // center: [-88.483089, 44.245683],
            zoom: zoom,
        });

        // marker.current = new maptilersdk.Marker({
        //     element: createCustomMarkerElement(),
        //     anchor: "bottom", // Adjust anchor based on your marker design
        // })
        //     .setLngLat([72.1383226, 21.7621129])
        //     .addTo(map.current);
        map.current.on("load", () => {
            setMapLoaded(true);
            setLoading(false); // Hide loader when map is loaded
        });

        const handleMapClick = (event) => {
            // Get the coordinates of the clicked location
            const { clientX, clientY } = event;
            const { lng, lat } = map.current
                ? map.current.unproject([clientX, clientY])
                : { lng: null, lat: null };
            // console.log("Clicked location - Latitude:", lat, "Longitude:", lng);

            // fetch(
            //     `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&language=en&key=3efee4f8b54a4c238c687e26d26a0db4`
            // )
            //     .then((response) => response.json())
            //     .then((data) => {
            //         // console.log(data);
            //         setselectedArea(data.results[0]);
            //         // if (data.status.code == 200 && data.results.length > 0) {
            //         //     console.log(data.results[0].formatted);
            //         // }
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error);
            //     });
        };

        mapContainer.current.addEventListener("click", handleMapClick);
        const addMarker = (lng, lat, id, markerid, type) => {
            const markerElement = createCustomMarkerElement(type);
            const markerObject = new maptilersdk.Marker({
                element: markerElement,
                anchor: "bottom", // Adjust anchor based on your marker design
            })
                .setLngLat([lng, lat])
                .addTo(map.current);

            // Add the new marker object to the array
            markers.current.push({ id, markerObject });
            markerElement.addEventListener("click", () => {
                console.log(`hello ${markerid}`);
                setSelectedStation(station.find((s) => s.id === markerid));
                // setselectedArea(null);
            });
        };

        const fueladdMarker = (lng, lat, id, markerid) => {
            const markerElement = createCustomfuelMarkerElement();
            const markerObject = new maptilersdk.Marker({
                element: markerElement,
                anchor: "bottom", // Adjust anchor based on your marker design
            })
                .setLngLat([lng, lat])
                .addTo(map.current);

            // Add the new marker object to the array
            fuelmarkers.current.push({ id, markerObject });
            markerElement.addEventListener("click", () => {
                console.log(`hello ${markerid}`);
                setSelectedStation(station.find((s) => s.id === markerid));
                // setselectedArea(null);
            });
        };

        map.current.on("moveend", () => {
            const bounds = map.current.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();

            // Filter station data based on current map bounds
            const visibleMarkers = station?.filter((data, index) => {
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
                    marker.id,
                    marker.type
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
                            marker.id
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
        loading,
        mapLoaded,
    ]);

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

    // Function to check if coordinates are valid numbers
    const isValidCoordinate = (coord) => {
        return !isNaN(coord) && isFinite(coord);
    };

    // console.log(store.isclickondirection, store.location);

    const createCustomMarkerElement = (type) => {
        const markerEl = document.createElement("img");
        markerEl.className = "custom-marker";
        // markerEl.src = mapmarker;
        markerEl.style.width = "30px";
        markerEl.style.height = "30px";
        markerEl.style.display = "flex";
        markerEl.style.alignItems = "center";
        markerEl.style.justifyContent = "center";
        markerEl.style.backgroundRepeat = "no-repeat";

        if (type === "ev") {
            markerEl.src = mapmarker; // Use your EV marker image path
        } else if (type === "cng") {
            markerEl.src = petrolmarker; // Use your CNG marker image path
        } else {
            markerEl.src = mapmarker; // Use your marker image path
        }
        return markerEl;
    };
    const createCustomfuelMarkerElement = () => {
        const markerEl = document.createElement("img");
        markerEl.className = "custom-marker";
        markerEl.src = petrolmarker;
        markerEl.style.width = "30px";
        markerEl.style.height = "30px";
        markerEl.style.display = "flex";
        markerEl.style.alignItems = "center";
        markerEl.style.justifyContent = "center";
        markerEl.style.backgroundRepeat = "no-repeat";
        return markerEl;
    };

    // useEffect(() => {
    //     // function flyover() {
    //     // if (
    //     //     store.isclickondirection &&
    //     //     store.location.length !== 0 &&
    //     //     map.current
    //     // ) {

    //     // }
    //     // }
    //     const timer = setTimeout(() => {
    //         if (map.current) {
    //             map.current.flyTo({
    //                 center: [-89.852801, 33.785742],
    //                 zoom: zoom,
    //             });
    //         }
    //     }, 5000);

    //     // Clear the timer on component unmount
    //     return () => clearTimeout(timer);
    // }, [zoom]);

    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371.0;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function top10NearbyStations(currentLat, currentLon, stations) {
        const distances = [];
        for (const station of stations) {
            const distance = haversine(
                currentLat,
                currentLon,
                station.latitude,
                station.longitude
            );
            distances.push({ distance, station });
        }
        distances.sort((a, b) => a.distance - b.distance); // sort stations by distance
        const nearbyStations = [];
        const visitedCoordinates = new Set(); // to ensure uniqueness based on coordinates
        for (const { distance, station } of distances) {
            if (nearbyStations.length === 10) {
                break; // stop if we have found 10 nearby stations
            }
            const coordinateKey = `${station.latitude},${station.longitude}`;
            if (!visitedCoordinates.has(coordinateKey)) {
                nearbyStations.push(station);
                visitedCoordinates.add(coordinateKey);
            }
        }
        return nearbyStations;
    }
    // const origin = [-89.852801, 33.785742];
    const top10 = station
        ? top10NearbyStations(33.885742, -89.852801, station)
        : null;
    // console.log("====================================");
    // console.log(top10NearbyStations(33.885742, -89.852801, stations));
    // // console.log("====================================");
    // function handleClickDirection() {
    //     store.setisclickondirection(true);
    //     // Set location after navigating to home
    //     navigate("/home");
    //     // setTimeout(() => {
    //     //     store.setisclickondirection(false);
    //     // }, 3000);
    // }

    const sliderRef = useRef(null);
    useEffect(() => {
        if (!sliderRef.current || !top10) return;
        const elements = sliderRef.current.querySelectorAll(".slide");

        elements.forEach((element, index) => {
            gsap.fromTo(
                element,
                { scale: 0.8, rotation: 0, opacity: 0 },
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1,
                    delay: index * 0.2,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, [top10]);
    const [visibleStations, setVisibleStations] = useState(10);

    const loadMore = () => {
        setVisibleStations((prevVisibleStations) => prevVisibleStations + 10);
    };
    useEffect(() => {
        // Function to hide the AreaPopup component after 10 seconds
        const hideAreaPopup = () => {
            setTimeout(() => {
                setselectedArea(null);
                setSelectedStation(null);
            }, 10000); // 10 seconds
        };

        // Call the function to hide the AreaPopup component
        hideAreaPopup();

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(hideAreaPopup);
    }, [selectedArea]); // Execute when selectedArea changes
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" w-screen h-[100dvh] bg-cosgreen relative"
        >
            {store.allstation && (
                <div className="w-[100dvw] h-[100dvh] bg-coswhite fixed z-[1111111]">
                    <div className="w-full h-[7%] bg-cosgreen flex items-center">
                        <img
                            src={back}
                            alt=""
                            className="w-[25px] ml-5 cursor-pointer"
                            onClick={() =>
                                store.setallstation(!store.allstation)
                            }
                        />
                        <p className="text-white poppins-medium ml-5">
                            Station Details
                        </p>
                    </div>
                    <div className="w-[100dvw] h-[35%] bg-coswhite rounded-b-sm fixed">
                        <div className="w-[100%] h-[10%]">
                            {" "}
                            <h1 className="poppins-medium m-3 text-[15px]">
                                Top 10 Near by Station
                            </h1>
                        </div>
                        <div
                            id="slider"
                            className="w-full h-[85%] overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                            ref={sliderRef}
                        >
                            {station &&
                                top10?.map((item, key) => (
                                    <motion.div
                                        key={key}
                                        className="slide w-[50%] h-[90%] text-white inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 bg-cosgreen m-2 p-3 rounded-2xl justify-center items-center mt-3"
                                    >
                                        <div className="w-full h-full flex-col flex justify-center items-center">
                                            <div className="w-[95%] h-[70%] rounded-2xl mb-2 overflow-hidden justify-center items-center flex">
                                                <img
                                                    onClick={() =>
                                                        navigate(
                                                            `/station/${item?.id}`
                                                        )
                                                    }
                                                    src={car}
                                                    alt=""
                                                    className="w-[150px]"
                                                />
                                            </div>
                                            <div className="w-[95%] h-[20%] text-[10px] flex flex-row">
                                                <div className="flex flex-col w-[80%] h-full">
                                                    <p>{item?.stationName}</p>
                                                    <p className="truncate">
                                                        {item?.stationAddress}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col w-[20%] justify-center items-center text-[20px]">
                                                    <div className="bg-coswhite w-[40px] h-[40px] rounded-full">
                                                        <img
                                                            onClick={() => {
                                                                store.setallstation(
                                                                    !store.allstation
                                                                );
                                                                handleSearchResultClick(
                                                                    item.longitude,
                                                                    item.latitude
                                                                );
                                                            }}
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

                    <div className="w-[100%] h-[60%] absolute top-[42%] ">
                        <div className="w-full h-full overflow-auto rm">
                            <div className="container mx-auto p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {stations
                                        .slice(0, visibleStations)
                                        .map((station) => (
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/station/${station.id}`
                                                    )
                                                }
                                                key={station.id}
                                                className="bg-cosgreen shadow-lg rounded-lg p-4"
                                            >
                                                <h3 className="text-xl font-bold mb-2 text-white">
                                                    {station.stationName}
                                                </h3>
                                                <p className="text-white mb-2">
                                                    {station.stationAddress}
                                                </p>
                                                <p className="text-white">
                                                    Latitude: {station.latitude}
                                                </p>
                                                <p className="text-white">
                                                    Longitude:{" "}
                                                    {station.longitude}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                                {visibleStations < stations.length && (
                                    <div className="flex justify-center mt-4">
                                        <button
                                            onClick={loadMore}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                    EV Pointer
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handlesearch();
                            }
                        }}
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
                                setSearchResults([]);
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
                {/* {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center bg-white  z-50"
                    >
                        <div className="loader">
                            <img src={spin} alt="" />
                        </div>
                    </motion.div>
                ) : ( */}
                    <div
                        className={`w-full h-[40%] flex justify-center items-center  absolute bottom-0 ${
                            isactivesearch ? "z-[11]" : "z-[-11]"
                        }  `}
                    >
                        <div
                            id="slider"
                            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
                        >
                            {isactivesearch &&
                                searchResults &&
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
                {/* )} */}
                <div
                    onClick={() => store.setallstation(!store.allstation)}
                    className="cursor-pointer shadow-2xl w-[50px] h-[50px] z-[22] absolute flex justify-center items-center  right-0 bottom-8"
                >
                    <div className="w-[90%] h-[90%]  bg-white flex justify-center items-center rounded-full">
                        <img src={nearby} alt="" />
                    </div>
                </div>

                {/* <div
                    id="frame"
                    style={{ width: "320px" }}
                    className="absolute flex justify-center items-center z-[22]"
                >
                    <iframe
                        data-aa="2326184"
                        src="//ad.a-ads.com/2326184?size=320x50"
                        style={{
                            width: "320px",
                            height: "50px",
                            overflow: "hidden",
                            backgroundColor: "transparent",
                        }}
                    ></iframe>
                    <a
                        style={{
                            display: "block",
                            textAlign: "right",
                            fontSize: "12px",
                        }}
                        // style="display: block; text-align: right; font-size: 12px"
                        id="preview-link"
                        href="https://a-ads.com/?partner=2326184"
                    >
                        Advertise here
                    </a>
                </div> */}

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

                {selectedArea && (
                    <AnimatePresence>
                        <AreaPopup
                            data={selectedArea}
                            onClose={() => setselectedArea(null)}
                        ></AreaPopup>
                    </AnimatePresence>
                )}
            </motion.div>

            <Navbar />
        </motion.div>
    );
};

export default Home;
