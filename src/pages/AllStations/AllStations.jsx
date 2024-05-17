import React from "react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import car from "../../assets/car.jpg";
import { Store } from "../../store/store";
import directiongreen from "../../assets/directionsgreen.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
    iconUrl: directiongreen, // Add your own marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function AllStations() {
    const navigate = useNavigate();
    const store = Store();
    const allStations = JSON.parse(localStorage.getItem("stations"));
    const [stations, setStations] = useState([]);

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
    const top10 = top10NearbyStations(33.885742, -89.852801, stations);
    // console.log("====================================");
    // console.log(top10NearbyStations(33.885742, -89.852801, stations));
    // console.log("====================================");
    function handleClickDirection() {
        store.setisclickondirection(true);
        // Set location after navigating to home
        navigate("/home");
        // setTimeout(() => {
        //     store.setisclickondirection(false);
        // }, 3000);
    }

    return (
        <div className="w-[100dvw] h-[100dvh] bg-primary">
            <div className="w-[100dvw] h-[35%] bg-coswhite rounded-b-sm fixed">
                <div className="w-[100%] h-[10%]">
                    {" "}
                    <h1 className="poppins-medium m-3 text-[15px]">
                        Top 10 Near by Station
                    </h1>
                </div>
                <div
                    id="slider"
                    className="w-full h-[90%] overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
                >
                    {top10?.map((item, key) => (
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
                                            navigate(`/station/${item?.id}`)
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
                                        <p className="">{item?.stationName}</p>
                                        <p className=" truncate">
                                            {item?.stationAddress}
                                        </p>
                                    </div>
                                    <div className="flex flex-col w-[20%] justify-center items-center text-[20px]">
                                        <div className="bg-coswhite w-[40px] h-[40px] rounded-full">
                                            <img
                                                onClick={() => {
                                                    handleClickDirection();

                                                    store.setlocation([
                                                        item.latitude,
                                                        item.longitude,
                                                    ]);
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

            <div className="w-[100%] h-[70%] ">
                <div className="w-full h-full ">
                    <div className="w-[100%] h-[100%] container mt-40">
                        <MapContainer
                            center={[33.885742, -89.852801]}
                            zoom={10}
                            className="w-full h-full"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {displayedStations.map((station, index) => (
                                <Marker
                                    key={index}
                                    position={[
                                        station.latitude,
                                        station.longitude,
                                    ]}
                                    icon={customIcon}
                                >
                                    <Popup>
                                        <div>
                                            <h3>{station.stationName}</h3>
                                            <p>{station.stationAddress}</p>
                                            <button
                                                onClick={() =>
                                                    handleClickDirection(
                                                        station
                                                    )
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
                </div>
            </div>
        </div>
    );
}

export default AllStations;
