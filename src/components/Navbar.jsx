import { motion } from "framer-motion";

import searchgreen from "../assets/searchgreen.png";
import chat from "../assets/chat.png";
import Bookmark from "../assets/Bookmark.png";
import mapgreen from "../assets/mapgreen.png";
import profile from "../assets/profile.png";
import { useEffect } from "react";
import plus from "../assets/plus.png";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store/store";
function Navbar() {
    const store = Store();
    const navigate = useNavigate();
    const nav = [
        {
            name: "Map",
            path: "/Home",
            img: mapgreen,
        },
        {
            name: "Search",
            path: "/Search",
            img: searchgreen,
        },

        {
            name: "Bookmark",
            path: "/Bookmark",
            img: Bookmark,
        },
        {
            name: "Profile",
            path: "/Profile",
            img: profile,
            onclick: async () => {
                await store.getUser(navigate);
            },
        },
    ];
    useEffect(() => {
        async function fatch() {
            await store.getbookmark();
        }
        fatch();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-[10%] rounded-t-sm bg-primary flex flex-row justify-around items-center    bottom-0"
        >
            {nav.map((item, index) =>
                item.name === "Search" ? (
                    <div className="" key={index}>
                        <div
                            className="flex justify-center items-center"
                            onClick={() => store.setissearch(!store.issearch)}
                        >
                            <img
                                onClick={item.onclick}
                                src={item.img}
                                className={` ${
                                    item.name === "Plus"
                                        ? "w-[59px] "
                                        : "w-[30px]"
                                }`}
                                alt=""
                            />
                        </div>

                        <div className="flex justify-center items-center text-cosgreen poppins-medium text-[12px]">
                            {item.name === "Plus" ? "" : item.name}
                        </div>
                    </div>
                ) : (
                    <div className="" key={index}>
                        <Link
                            to={item.path}
                            onClick={() => {
                                item.name === "Bookmark "
                                    ? store.getbookmark()
                                    : "";
                            }}
                        >
                            <div className="flex justify-center items-center">
                                <img
                                    onClick={item.onclick}
                                    src={item.img}
                                    className={` ${
                                        item.name === "Plus"
                                            ? "w-[59px] "
                                            : "w-[30px]"
                                    }`}
                                    alt=""
                                />
                            </div>
                        </Link>
                        <div className="flex justify-center items-center text-cosgreen poppins-medium text-[12px]">
                            {item.name === "Plus" ? "" : item.name}
                        </div>
                    </div>
                )
            )}
        </motion.div>
    );
}

export default Navbar;
