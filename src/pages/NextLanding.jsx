import { motion } from "framer-motion";
import carcharging from "../assets/carcharge.jpg";

import station from "../assets/station.png";
import mapred from "../assets/mapred.png";
import bell from "../assets/bell.png";
import vd from "../assets/greenthird.mp4";

import { Link } from "react-router-dom";
export const NextLanding = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-[100dvh] "
        >
            <video loop autoPlay muted id="bg-v">
                <source src={vd} type="video/mp4" />
            </video>
            <div className="w-full h-[40%] flex flex-col justify-center items-center">
                <div className="w-[100%] p-5  h-[80%] flex flex-row justify-center items-center   backdrop-blur-sm">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={carcharging}
                        alt=""
                        className="w-[80%] hidden"
                    />
                    <p className="text-center text-[35px] poppins-medium text-cosgreen font-extrabold ">
                        <span className="font-extrabold ">Discover</span> nearby
                        station with{" "}
                        <span className="dancing-script text-[45px]">ease</span>{" "}
                        and{" "}
                        <span className="dancing-script text-[45px] ">
                            speed
                        </span>
                    </p>
                </div>
            </div>

            <div className="w-full  h-[60%] flex flex-col items-center justify-center rounded-t-3xl shadow-3xl p-5 ">
                <div className="w-[90%] h-[15%] flex flex-row items-center  m-2">
                    <div className="w-[60px] h-[60px] rounded-full bg-white  shadow-3xl flex justify-center items-center ">
                        <img src={mapred} alt="" className="w-[40px] " />
                    </div>
                    <div>
                        <p className="text-[14px] poppins-medium text-white pl-6">
                            Locating nearby station
                        </p>
                    </div>
                </div>

                <div className="w-[90%] h-[15%] flex flex-row  items-center m-2 ">
                    <div className="w-[20%]">
                        <div className="w-[60px] h-[60px] rounded-full bg-white shadow-3xl flex justify-center items-center mr-2">
                            <img src={bell} alt="" className="w-[35px]" />
                        </div>
                    </div>
                    <div className="w-[80%]">
                        <p className="text-[14px] poppins-medium text-white pl-6">
                            Adding station to your favourites
                        </p>
                    </div>
                </div>
                <div className="w-[90%] h-[15%] flex flex-row  items-center  m-2">
                    <div className="w-[20%]">
                        <div className="w-[60px] h-[60px] rounded-full bg-white  shadow-3xl flex justify-center items-center">
                            <img src={station} alt="" className="w-[35px]" />
                        </div>
                    </div>
                    <div className="w-[80%]">
                        <p className="text-[14px] poppins-medium text-white pl-6">
                            Customize station preferences
                        </p>
                    </div>
                </div>
                <motion.div className="w-[90%] bg-cosgreen h-[15%] flex flex-row justify-center items-center    m-5 shadow-3xl overflow-hidden">
                    <Link to="/Register">
                        <motion.button
                            whileTap={{
                                scale: 1,
                                width: "60px",
                                borderRadius: "50%",
                            }}
                            className="w-full rounded-2xl h-full flex justify-between items-center poppins-medium text-2xl text-coswhite bg-cosgreen p-5"
                        >
                            Register
                        </motion.button>
                    </Link>
                </motion.div>
                <Link to="/Login">
                    <p className="text-left text-white  poppins-medium text-[15px]">
                        Already have an account?{" "}
                        <span className="underline">Login</span>
                    </p>
                </Link>
            </div>
        </motion.div>
    );
};
