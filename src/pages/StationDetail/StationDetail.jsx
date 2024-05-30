import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import card from "../../assets/stationdetail/card.png";
import location from "../../assets/stationdetail/location.gif";
import locationpng from "../../assets/stationdetail/location.png";
import name from "../../assets/stationdetail/name.gif";
import namepng from "../../assets/stationdetail/name.png";
import state from "../../assets/stationdetail/state.png";
import opentime from "../../assets/stationdetail/opentime.gif";
import { useRef } from "react";
import opentimepng from "../../assets/stationdetail/opentime.png";
import phonepng from "../../assets/stationdetail/phone.png";
import phone from "../../assets/stationdetail/phone.gif";
import countrypng from "../../assets/stationdetail/country.png";
import country from "../../assets/stationdetail/country.gif";
import websitepng from "../../assets/stationdetail/website.png";
import website from "../../assets/stationdetail/website.gif";
import { Store } from "../../store/store";
import { ClipLoader } from "react-spinners";
import { gsap } from "gsap";
import { useEffect } from "react";
import back from "../../assets/profile/back.png";
import { useNavigate } from "react-router-dom";

function StationDetail() {
    const navigate = useNavigate();
    const store = Store();
    const { stationId } = useParams();
    const stations = JSON.parse(localStorage.getItem("stations"));
    const reviews = JSON.parse(localStorage.getItem("reviews"));

    // const photoes = [];
    const [photoes, setphotoes] = useState([]);
    const station = stations.find(
        (station) => parseInt(station.id) === parseInt(stationId)
    );
    const [reviewinput, setreviewinput] = useState("");
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const photoSliderRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const query = {
        stationId: parseInt(stationId),
    };
    const query2 = {
        stationId: stationId,
    };
    // console.log("====================================");
    // console.log(station);
    // console.log("====================================");

    const [activeTab, setActiveTab] = useState("overview");
    const [isHovered, setIsHovered] = useState({
        name: false,
        phone: false,
        website: false,
        address: false,
        country: false,
        contact: false,
        map: false,
    });

    useEffect(() => {
        async function fatch() {
            await store.getreview(query);
        }
        fatch();
        console.log(store.user);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            gsap.to(photoSliderRef.current, {
                x: `-${currentPhotoIndex * 100}%`,
                duration: 1,
                ease: "power2.inOut",
            });
            setCurrentPhotoIndex((prev) =>
                prev === photoes.length - 1 ? 0 : prev + 1
            );
        }, 4000);
        return () => clearInterval(interval);
    }, [currentPhotoIndex, photoes.length]);

    const [copySuccess, setCopySuccess] = useState("");

    const handlereview = async () => {
        await store.addreview({
            stationId: parseInt(stationId),
            reviewText: reviewinput,
        });
    };

    useEffect(() => {
        const location = station.stationName;
        const url = `https://api.unsplash.com/search/photos?query=${location}&client_id=qmpsLecbihw5wQY9wlV271wgFA9HKO9zOEo8kDAQfWw`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Log the URLs of the first few photos
                const fetchedPhotos = data.results.map((e) => e.urls.full);
                setphotoes(fetchedPhotos);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching photos:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const preloadedImages = photoes.map((photo) => {
            const img = new Image();
            img.src = photo;
            return img;
        });

        Promise.all(preloadedImages.map((img) => img.decode()))
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error preloading images:", error);
                setLoading(false);
            });
    }, [photoes]);

    const handledeletereview = async (id) => {
        await store.removereview({
            reviewId: parseInt(id),
        });
    };
    const handleCopy = (phoneNumber) => {
        navigator.clipboard.writeText(phoneNumber).then(
            () => {
                setCopySuccess("Copied!");
                setTimeout(() => setCopySuccess(""), 2000);
            },
            (err) => {
                setCopySuccess("Failed to copy!");
                console.error("Could not copy text: ", err);
                setTimeout(() => setCopySuccess(""), 2000);
            }
        );
    };
    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <motion.div className="  w-[100%] h-[100%] ">
                        <div className="w-[100%] h-[100%] flex flex-col ">
                            <div className="w-[100%] h-[15%] ">
                                <div className="flex justify-center items-center w-[100%] h-[100%]">
                                    <div className="w-[20%] h-[100%] flex justify-center items-center">
                                        <img
                                            src={
                                                isHovered.name ? name : namepng
                                            }
                                            className="w-[50%]"
                                            alt=""
                                            onMouseEnter={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    name: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    name: false,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center">
                                        {station.stationName}
                                    </div>
                                </div>
                            </div>
                            <div className="w-[100%] h-[15%] ">
                                <div className="flex justify-center items-center w-[100%] h-[100%]">
                                    <div className="w-[20%] h-[100%] flex justify-center items-center">
                                        <img
                                            src={
                                                isHovered.address
                                                    ? location
                                                    : locationpng
                                            }
                                            className="w-[50%]"
                                            alt=""
                                            onMouseEnter={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    address: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    address: false,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center overflow-auto rm">
                                        {station.stationAddress}
                                    </div>
                                </div>
                            </div>
                            {/* state */}
                            <div className="w-[100%] h-[15%] ">
                                <div className="flex justify-center items-center w-[100%] h-[100%]">
                                    <div className="w-[20%] h-[100%] flex justify-center items-center">
                                        <img
                                            src={state}
                                            className="w-[50%]"
                                            alt=""
                                        />
                                    </div>
                                    <div className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center overflow-auto rm">
                                        {station.city} {station.state}
                                    </div>
                                </div>
                            </div>

                            {/* country */}
                            <div className="w-[100%] h-[15%] ">
                                <div className="flex justify-center items-center w-[100%] h-[100%]">
                                    <div className="w-[20%] h-[100%] flex justify-center items-center">
                                        <img
                                            src={
                                                isHovered.country
                                                    ? country
                                                    : countrypng
                                            }
                                            className="w-[50%]"
                                            alt=""
                                            onMouseEnter={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    country: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    country: false,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center overflow-auto rm">
                                        {station.country}
                                    </div>
                                </div>
                            </div>

                            {/* phone
                             */}

                            <div className="w-[100%] h-[15%] ">
                                <div className="flex justify-center items-center w-[100%] h-[100%]">
                                    <div className="w-[20%] h-[100%] flex justify-center items-center">
                                        <img
                                            src={
                                                isHovered.phone
                                                    ? phone
                                                    : phonepng
                                            }
                                            className="w-[50%]"
                                            alt=""
                                            onMouseEnter={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    phone: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    phone: false,
                                                })
                                            }
                                        />
                                    </div>
                                    <a
                                        onDoubleClick={() =>
                                            handleCopy(station.stationPhone)
                                        }
                                        href={`tel:${station.stationPhone}`}
                                        className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center overflow-auto rm"
                                    >
                                        {station.stationPhone
                                            ? station.stationPhone
                                            : "Not Available"}
                                        {copySuccess && (
                                            <span className="ml-2 text-white bg-green-400 poppins-medium text-xs">
                                                {copySuccess}
                                            </span>
                                        )}
                                    </a>
                                </div>
                            </div>

                            {/* website */}

                            <div className="w-[100%] h-[15%] ">
                                <div className="flex justify-center items-center w-[100%] h-[100%]">
                                    <div className="w-[20%] h-[100%] flex justify-center items-center">
                                        <img
                                            src={
                                                isHovered.website
                                                    ? website
                                                    : websitepng
                                            }
                                            className="w-[50%]"
                                            alt=""
                                            onMouseEnter={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    website: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setIsHovered({
                                                    ...isHovered,
                                                    website: false,
                                                })
                                            }
                                        />
                                    </div>
                                    <a
                                        href={`${station.website}`}
                                        className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center overflow-auto rm"
                                    >
                                        {station.website
                                            ? station.website
                                            : "No website Available"}
                                    </a>
                                </div>
                            </div>

                            <div className="w-[100%] h-[15%] ">
                                <div className="flex justify-around items-center w-[100%] h-[100%]">
                                    <button className="w-[30%] h-[50%] bg-black text-white rounded-lg flex justify-center items-center poppins-medium">
                                        Directions
                                    </button>
                                    <button
                                        className="w-[30%] h-[50%] bg-black text-white rounded-lg flex justify-center items-center poppins-medium"
                                        onClick={() => store.addbookmark(query)}
                                    >
                                        bookmark
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case "review":
                return (
                    <motion.div className="justify-center items-center flex w-[100%] h-[100%]">
                        {reviews.length === 0 ? (
                            <div className="w-full h-full ">
                                <div className="w-full h-[90%] poppins-medium flex justify-center items-center">
                                    No review Available
                                </div>

                                <div className="w-full fixed bottom-0 h-[10%] bg-white flex items-center justify-center">
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setreviewinput(e.target.value)
                                        }
                                        placeholder="Write a review..."
                                        className="w-[80%] max-w-lg p-2 border bg-white   outline-none rounded-lg shadow   focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => {
                                            handlereview();
                                            store.getreview(query);
                                        }}
                                        className="w-[20%] h-full bg-blue-700 text-white poppins-medium rounded-l-3xl"
                                    >
                                        {" "}
                                        Submit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full ">
                                <div className="w-full h-[90%] flex flex-col items-center">
                                    {reviews &&
                                        reviews?.map((review) => (
                                            <div
                                                key={review.id}
                                                className="border p-4 m-2 w-full max-w-md rounded shadow"
                                            >
                                                <div className="flex items-center mb-2">
                                                    <img
                                                        src={
                                                            review.User
                                                                .profilePicture
                                                        }
                                                        alt={
                                                            review.User.userName
                                                        }
                                                        className="w-12 h-12 rounded-full mr-2"
                                                    />
                                                    <div>
                                                        <div className="font-bold">
                                                            {
                                                                review.User
                                                                    .userName
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {review.timeAgo}
                                                        </div>
                                                    </div>
                                                    {store.user.id ==
                                                    review.User.id ? (
                                                        <div
                                                            className="cursor-pointer items-end flex justify-end w-[150px] poppins-medium"
                                                            onClick={() =>
                                                                handledeletereview(
                                                                    review.id
                                                                )
                                                            }
                                                        >
                                                            ×
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-2">
                                                    <div className="font-bold">
                                                        {
                                                            review.Station
                                                                .stationName
                                                        }
                                                    </div>
                                                </div>
                                                <div className="text-gray-700">
                                                    {review.review}
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <div className="w-full fixed bottom-0 h-[10%] bg-white flex items-center justify-center">
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setreviewinput(e.target.value)
                                        }
                                        placeholder="Write a review..."
                                        className="w-[80%] max-w-lg p-2 border bg-white   outline-none rounded-lg shadow   focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => {
                                            handlereview();
                                            store.getreview(query);
                                        }}
                                        className="w-[20%] h-full bg-blue-700 text-white poppins-medium rounded-l-3xl"
                                    >
                                        {" "}
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            case "photos":
                return (
                    <motion.div className="justify-center items-center flex w-[100%] h-[100%] ">
                        No Photos available
                    </motion.div>
                );
            case "about":
                return (
                    <motion.div className="  w-[100%] h-[100%] flex flex-col">
                        <div className="w-[100%] h-[15%] ">
                            <div className="flex justify-center items-center w-[100%] h-[100%]">
                                <div className="w-[20%] h-[100%] flex justify-center items-center">
                                    <img
                                        src={card}
                                        className="w-[50%]"
                                        alt=""
                                    />
                                </div>
                                <div className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center">
                                    {station.cardaccepted} Acceptable
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] h-[15%] ">
                            <div className="flex justify-center items-center w-[100%] h-[100%]">
                                <div className="w-[20%] h-[100%] flex justify-center items-center">
                                    <img
                                        src={opentimepng}
                                        className="w-[50%]"
                                        alt=""
                                    />
                                </div>
                                <div className="poppins-medium text-[0.8em] text-slate-500 w-[80%] h-[100%] flex ml-2 items-center">
                                    {station.openTime}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return <div>Overview content</div>;
        }
    };

    const tabs = ["overview", "review", "photos", "about"];
    return (
        <div className="w-[100vw] h-[100dvh] bg-white">
            <div className="w-[100vw] h-[35%] bg-white fixed z-[55]">
                <div className="photoes poppins-medium  w-[100%]  bg-primary transition-all duration-100 ease-out cursor-pointer  hover:backdrop-opacity-2xl h-[80%] justify-center flex items-center">
                    <motion.div className="station-image flex flex-col w-[100%] h-[100%]">
                        <div
                            className="w-[100%] h-[100%] flex "
                            style={{ overflow: "hidden" }}
                        >
                            <img
                                onClick={() => navigate("/home")}
                                src={back}
                                className="absolute z-[1111] w-[40px] m-3"
                                alt=""
                            />
                            <div
                                ref={photoSliderRef}
                                className="slider"
                                style={{
                                    display: "flex",
                                    transition: "transform 1s ease",
                                }}
                            >
                                {photoes.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Station photo ${index + 1}`}
                                        className="slider-image"
                                        style={{
                                            width: "100%",
                                            flexShrink: 0,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* <div className="controls">
                            {photoes.map((_, index) => (
                                <button
                                    key={index}
                                    className={`control-button ${
                                        currentPhotoIndex === index
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setCurrentPhotoIndex(index)}
                                />
                            ))}
                        </div> */}
                    </motion.div>
                </div>
                <div className="h-[2px] w-[100%] bg-white " />
                <div className="w-[100%] h-[20%] bg-white flex justify-center items-center poppins-light">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className="w-[25%] h-[100%] flex justify-center items-center text-[15px] cursor-pointer"
                            onClick={() => {
                                setActiveTab(tab);
                                tab === "review"
                                    ? store.getreview(query)
                                    : null;

                                console.log(
                                    "===================================="
                                );
                                console.log(typeof query.stationId);
                                console.log(
                                    "===================================="
                                );
                            }}
                        >
                            {tab}
                        </div>
                    ))}
                    <motion.div
                        className="absolute bottom-0 h-[2px] bg-cosgreen"
                        animate={{ left: `${tabs.indexOf(activeTab) * 25}%` }}
                        transition={{
                            duration: 0.1,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        style={{ width: "25%" }}
                    />
                </div>
            </div>

            <div className="rm w-[100vw] h-[65%] absolute top-[35%] bg-white overflow-auto">
                <AnimatePresence>
                    <motion.div
                        className="w-[100%] h-[100%]"
                        key={activeTab}
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -100, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default StationDetail;
