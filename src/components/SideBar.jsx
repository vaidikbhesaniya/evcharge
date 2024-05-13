import React from "react";
import { motion } from "framer-motion";
import { Store } from "../store/store";
import Bookmark from "../assets/Bookmark.png";

import premium from "../assets/sidebar/premium.png";
import addcharging from "../assets/sidebar/addcharging.png";
import form from "../assets/sidebar/form.png";
import list from "../assets/sidebar/list.png";
import rate from "../assets/sidebar/rate.png";
import share from "../assets/sidebar/share.png";
import profile from "../assets/profile.png";
import car from "../assets/car.jpg";
import logout from "../assets/logout.png";
export default function SideBar() {
    const store = Store();

    const sidebardata = [
        {
            title: "Booknark Locations",
            path: "/",
            icon: Bookmark,
        },
        {
            title: "Premium",
            path: "/Premium",
            icon: premium,
        },
        {
            title: "Add Ev Station",
            path: "/login",
            icon: addcharging,
        },
        {
            title: "Station List",
            path: "/",
            icon: list,
        },
        {
            title: "Share",
            path: "/Share",
            icon: share,
        },
        {
            title: "Rate",
            path: "/Rate",
            icon: rate,
        },
        {
            title: "Consent Form",
            path: "/",
            icon: form,
        },
        {
            title: "Profile",
            path: "/Profile",
            icon: profile,
        },
    ];
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-[70dvw] h-[100dvh] fixed bg-primary z-30 rounded-r-xl"
        >
            <div className="w-full h-[20%] flex justify-center items-center flex-col">
                <img
                    src={car}
                    alt=""
                    className="w-[80px] mt-4 mb-4 rounded-lg"
                />
                <p className="poppins-medium text-cosgreen text-[15px] mb-4">
                    Ev Charging Station Near me
                </p>
            </div>

            <div className="w-full h-[80%]">
                <div className="w-full h-[80%] flex justify-center  flex-col">
                    {sidebardata.map((data, index) => (
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{
                                scale: 0.9,
                                opacity: 0.5,
                            }}
                            key={index}
                            className="w-[85%] h-[9%] shadow-xl bg-coswhite text-cosgreen poppins-medium m-2 p-2 rounded-xl mr-4 ml-4 border-2 items-center flex"
                        >
                            <div className="w-[20%] h-full justify-center items-center flex ">
                                <img
                                    src={data.icon}
                                    className="w-[25px]"
                                    alt=""
                                />
                            </div>
                            <div className="text-sm"> {data.title}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full h-[20%] flex justify-center items-center ">
                    <div className="w-[60%] h-[50%] shadow-xl bg-red-500 text-white poppins-medium text-2xl m-2 p-2 rounded-xl mr-4 ml-4   justify-center items-center flex">
                        <div className="w-[20%] h-full justify-center items-center flex ">
                            <img src={logout} className="w-[25px]" alt="" />
                        </div>
                        Log out
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// {

// StationName:
// StationAddress:
// StaionLAt:
// StationLog:
// StationCat:["Fuel","ev","cng"]
// StationRate:""   //not compalsory
// StaionContact:""//not compalsary
// StationReviews:Object[UserId] // notcompalsory
// }
