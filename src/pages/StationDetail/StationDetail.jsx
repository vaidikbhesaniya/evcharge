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
import opentimepng from "../../assets/stationdetail/opentime.png";
import phonepng from "../../assets/stationdetail/phone.png";
import phone from "../../assets/stationdetail/phone.gif";
import countrypng from "../../assets/stationdetail/country.png";
import country from "../../assets/stationdetail/country.gif";
import websitepng from "../../assets/stationdetail/website.png";
import website from "../../assets/stationdetail/website.gif";
import { Store } from "../../store/store";

function StationDetail() {
    const store = Store();
    const { stationId } = useParams();
    const stations = JSON.parse(localStorage.getItem("stations"));
    const station = stations.find(
        (station) => parseInt(station.id) === parseInt(stationId)
    );

    const query = {
        stationId: parseInt(stationId),
    };
    console.log("====================================");
    console.log(station);
    console.log("====================================");

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

    const [copySuccess, setCopySuccess] = useState("");

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
                    <motion.div className="justify-center items-center flex w-[100%] h-[100%] ">
                        No review Available
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
        <div className="w-[100vw] h-[100dvh] bg-cosgreen">
            <div className="w-[100vw] h-[35%] bg-cosgreen fixed z-[55]">
                <div className="poppins-medium  w-[100%]  bg-primary transition-all duration-100 ease-out cursor-pointer  hover:backdrop-opacity-2xl h-[80%] justify-center flex items-center">
                    No photos Available
                </div>
                <div className="h-[2px] w-[100%] bg-white " />
                <div className="w-[100%] h-[20%] bg-white flex justify-center items-center poppins-light">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className="w-[25%] h-[100%] flex justify-center items-center text-[15px] cursor-pointer"
                            onClick={() => setActiveTab(tab)}
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
