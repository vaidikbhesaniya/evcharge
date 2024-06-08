import car from "../assets/car.jpg";
import { Link } from "react-router-dom";
import carcharge from "../assets/charging.png";
import map from "../assets/map.png";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Store } from "../store/store";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
    const store = Store();
    const navigate = useNavigate();

    // useEffect(() => {
    //     async function fetchData() {
    //         await store.handleallstations();
    //     }
    //     fetchData();
    // }, []);
    useEffect(() => {
        // if (store.user) {
        //     navigate("/home");
        // }
        // store.get
        // console.log(store.user);

        async function datafetch() {
            await store.getUser(navigate);
        }
        datafetch();
    }, []);
    return (
        <div className="bg-primary w-screen h-[100dvh]">
            <div className="w-full h-[43%] m-auto overflow-hidden">
                <img src={car} alt="" className="" />
            </div>

            <div className="w-full h-[50%] m-auto">
                <div className="w-full h-[50%]">
                    <p className="poppins-light text-white p-10 text-center ">
                        {" "}
                        <span className="">Unlock</span> the full potential of
                        your EV charging experience with our services
                    </p>

                    <p className="poppins-medium text-green-900 m-5 text-center">
                        Find and Navigate To nearby Charging{" "}
                    </p>
                </div>

                <div className="w-full h-[50%] flex flex-row">
                    <div className="w-[23%] h-full justify-center flex items-center ">
                        <button className="w-[60px] h-[60px] bg-white-400 flex justify-center items-center rounded-lg box shadow-md  ">
                            <Link to="/pricing">
                                <img
                                    src={carcharge}
                                    alt=""
                                    className="w-[45px]"
                                />
                            </Link>
                        </button>
                    </div>
                    <div className="w-[23%] h-full justify-center flex items-center ">
                        <button className="w-[60px] h-[60px] bg-darkgreen flex justify-center items-center rounded-lg box shadow-md  ">
                            <Link to="/map">
                                <img src={map} alt="" className="w-[45px]" />
                            </Link>
                        </button>
                    </div>

                    <motion.div
                        whileTap={{
                            scale: 1,
                            width: "60px",
                            borderRadius: "50%",
                        }}
                        className="w-[54%] h-full justify-center flex items-center "
                    >
                        <Link to="/pricing">
                            <button className=" w-[150px] h-[60px] bg-coswhite flex justify-center items-center rounded-lg box shadow-2xl text-xl poppins-medium text-cosgreen">
                                Get Started
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
export default LandingPage;
