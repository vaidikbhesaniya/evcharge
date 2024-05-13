import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import search from "../assets/search.png";
import carcover from "../assets/carcover.jpg";

import fastcharge from "../assets/fastcharge.png";
import rapid from "../assets/rapidcharge.png";
import standard from "../assets/standardcharge.png";
import supercharge from "../assets/supercharge.png";
import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef } from "react";
function Home() {
    //for api
    const fakedata = [
        {
            station_id: "123456789",
            station_name: "MobiLane Charging Station",
            station_address: "GRXH+FF, Virpur, Gujarat 364270",
            station_capacity: "80kw",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
            sorce: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1445714.515552069!2d71.24101446153328!3d21.677371121258734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be2071ae485c9cd%3A0x318ef78014c08d6f!2sMobiLane%20Charging%20Station!5e1!3m2!1sen!2sin!4v1714371115225!5m2!1sen!2sin",
        },
        {
            station_id: "123456789",
            station_name: "CHARGEPOD Charging Station",
            station_address: "Station Address",
            station_capacity: "50kw",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
            sorce: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1603652.8122686679!2d68.77770146224873!3d20.814531894016017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfd33a2d2a009e1%3A0x4aa8d47a2021b232!2sCHARGEPOD%20Charging%20Station!5e1!3m2!1sen!2sin!4v1714371363375!5m2!1sen!2sin",
        },
        {
            station_id: "123456789",
            station_name: "Fast charge station",
            station_address: "Station Address",
            station_capacity: "Station Capacity",
            station_lat: "Station Latitude",
            station_distance: "100m",
            station_long: "Station Longitude",
            sorce: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26889960.940113474!2d55.05544059891872!3d11.593050570216578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab9da45989f705%3A0xc2881964a44459e!2sZeon%20Charging%20Station!5e1!3m2!1sen!2sin!4v1714371659378!5m2!1sen!2sin",
        },
        {
            station_id: "123456789",
            station_name: "Fast charge station",
            station_address: "Station Address",
            station_capacity: "Station Capacity",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
        },
        {
            station_id: "123456789",
            station_name: "Fast charge station",
            station_address: "Station Address",
            station_capacity: "Station Capacity",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
        },
        {
            station_id: "123456789",
            station_name: "Fast charge station",
            station_address: "Station Address",
            station_capacity: "Station Capacity",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
        },
        {
            station_id: "123456789",
            station_name: "Fast charge station",
            station_address: "Station Address",
            station_capacity: "Station Capacity",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
        },
        {
            station_id: "123456789",
            station_name: "Fast charge station",
            station_address: "Station Address",
            station_capacity: "Station Capacity",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
        },
        {
            station_id: "123456789",
            station_name: "Fast charge station",
            station_address: "Station Address",
            station_capacity: "Station Capacity",
            station_lat: "Station Latitude",
            station_long: "Station Longitude",
            station_distance: "100m",
        },
    ];

    const sliderRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const checkScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollWidth - scrollLeft !== clientWidth);
        }
    };
    useEffect(() => {
        checkScroll();
    }, []);

    const filterdata = [
        {
            filtername: "Fast Charge",
            img: fastcharge,
        },
        {
            filtername: "Rapid Charge",
            img: rapid,
        },
        {
            filtername: "Standard Charge",
            img: standard,
        },
        {
            filtername: "Super Charge",
            img: supercharge,
        },
    ];
    const [data, setdata] = useState(filterdata.slice(0, 4));
    const addmore = () => {
        const newData = filterdata.slice(data.length, data.length + 2);
        setdata((prevData) => [...prevData, ...newData]);
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += 500;
            checkScroll();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-[100dvh] border-solid     bg-coswhite"
        >
            <div
                className="w-full h-[90%] m-auto overflow-hidden bg-coswhite
            "
            >
                <div className="w-full  h-[20%] bg-primary rounded-b-md flex flex-col justify-center items-center  backdrop-blur-2xl ">
                    <div className="w-[90%] h-[40%] flex flex-row justify-between items-center  bg-primary relative rounded-2xl p-6 text-center">
                        <h1 className="poppins-medium text-3xl mt-4 text-[#ffffff]">
                            Find Ev charging station{" "}
                        </h1>
                    </div>
                    <div className="w-[90%] h-[40%] flex flex-row justify-between items-center  bg-primary relative rounded-2xl top-8 ">
                        <img
                            src={search}
                            alt=""
                            className="w-[40px] p-1 ml-5"
                        />
                        <input
                            type="text"
                            className="w-[80%] placeholder:text-black  h-full text-[black] poppins-medium bg-primary rounded-e-2xl outline-none border-none"
                            placeholder="Search for a station"
                        />
                    </div>
                </div>
                <div className="overflow-auto scroll-smooth w-full h-[80%]  pt-6 poppins-medium  ">
                    <p className="pl-4 text-cosgreen text-sm">
                        Nearby charging spot
                    </p>
                    <div className="w-full h-[50%]  flex justify-between items-center ">
                        <div
                            id="slider"
                            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
                        >
                            {fakedata.map((item, key) => (
                                <div 
                                    key={key}
                                    className="w-[70%] h-[90%] text-white inline-block  cursor-pointer hover:scale-105 ease-in-out duration-300 bg-cosgreen m-2 p-3 rounded-2xl justify-center items-center mt-3"
                                >
                                    <div className="w-full h-full flex-col flex justify-center items-center">
                                        <div className="w-[95%] h-[80%]  rounded-2xl mb-2 overflow-hidden">
                                            <iframe
                                                src={item?.sorce}
                                                allowFullScreen
                                                loading="lazy"
                                            ></iframe>
                                        </div>
                                        <div className="w-[95%] h-[20%]  text-[10px] flex flex-row">
                                            <div className="flex flex-col w-[80%]">
                                                <p>{item.station_name}</p>
                                                <p>{item.station_capacity}</p>
                                            </div>
                                            <div className="flex flex-col w-[20%] justify-center items-center text-[20px]">
                                                <p>{item.station_distance}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-[50%]">
                        <p className="pl-4 text-cosgreen text-sm"> Filter by</p>
                        <div className="w-full h-[50%] relative flex items-center">
                            <div
                                ref={sliderRef}
                                id="filterslider"
                                className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
                            >
                                {data.map((i, index) => (
                                    <div
                                        key={index}
                                        className="w-[80px] shadow-md h-[80px] text-cosgreen inline-block  cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white m-2 p-3 rounded-2xl justify-center items-center mt-3"
                                    >
                                        <div className="w-full h-full flex-col flex justify-center items-center">
                                            <div className="  flex justify-center items-center w-[70%] h-[70%] mb-1">
                                                <img src={i.img} alt="" />
                                            </div>

                                            <div>
                                                <p className="flex justify-center items-center poppins-medium text-[8px]">
                                                    {i.filtername}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`w-[40px] h-[40px] bg-white flex justify-center items-center rounded-full absolute right-0 ${
                                    filterdata.length === data.length
                                        ? "hidden"
                                        : ""
                                } ${filterdata.length > 4 ? "" : "hidden"}`}
                            >
                                <MdChevronRight
                                    className="text-3xl text-cosgreen right-0"
                                    onClick={() => {
                                        addmore();
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                    <p className="text-center text-[#8d8d8d] text-[10px]">
                        copyright © 2024 by _______
                    </p>
                </div>
            </div>
            <Navbar />
        </motion.div>
    );
}

export default Home;
