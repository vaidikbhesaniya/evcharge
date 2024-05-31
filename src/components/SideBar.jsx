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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import profile from "../assets/profile.png";
import car from "../assets/car.jpg";
import logout from "../assets/logout.png";

import { Link, useNavigate } from "react-router-dom";
export default function SideBar() {
    const store = Store();
    const navigate = useNavigate();

    const sidebardata = [
        {
            title: "Booknark Locations",
            path: "/bookmark",
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
            path: "/stations",
            icon: list,
        },
        {
            title: "Share",
            path: "/chat",
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
            className="w-[70dvw]  h-[100dvh] fixed bg-primary z-30 rounded-r-xl"
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
                            {data.title === "Station List" ? (
                                <div
                                    className="w-full h-full flex item-center"
                                    onClick={() => {
                                        store.setSidebarOpen(false);
                                        store.setallstation(!store.allstation);
                                    }}
                                >
                                    <div className="w-[20%] h-full justify-center items-center flex ">
                                        <img
                                            src={data.icon}
                                            className="w-[25px]"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-sm"> {data.title}</div>
                                </div>
                            ) : (
                                <Link
                                    to={data.path}
                                    className="w-full h-full flex item-center"
                                    onClick={() => store.setSidebarOpen(false)}
                                >
                                    <div className="w-[20%] h-full justify-center items-center flex ">
                                        <img
                                            src={data.icon}
                                            className="w-[25px]"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-sm text-center">
                                        {" "}
                                        {data.title}
                                    </div>
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="w-full h-[20%] flex justify-center items-center bg-primary">
                    <AlertDialog className="bg-primary">
                        <AlertDialogTrigger className="w-[60%] h-[50%] shadow-xl bg-red-500 text-white poppins-medium text-2xl m-2 p-2 rounded-xl mr-4 ml-4   justify-center items-center flex cursor-pointer ">
                            <div className="w-[20%] h-full justify-center items-center flex ">
                                <img src={logout} className="w-[25px]" alt="" />
                            </div>{" "}
                            Log out
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-primary border-none">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-white">
                                    This action cannot be undone. This will
                                    logout your account.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => store.handlelogout(navigate)}
                                >
                                    {" "}
                                    logout
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
