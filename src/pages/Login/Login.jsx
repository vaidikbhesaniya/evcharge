import evcharge from "../../assets/evcharge.gif";
import { motion } from "framer-motion";
import Input from "../../components/Input";
import { Store } from "../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const store = Store();

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handlelogin = (e) => {
        e.preventDefault();
        // Call login function from store
        store.handleLogin(
            {
                email: loginData.email,
                password: loginData.password,
            },
            navigate
        );
        setLoginData({
            email: "",
            password: "",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-[100dvh] border-solid "
        >
            <div className=" w-full h-[20%] bg-white flex flex-row justify-around items-center">
                <img src={evcharge} alt="" />
            </div>

            <div className="w-full h-[80%] " id="register">
                <div className="w-full h-[20%]  rounded-t-md flex flex-row justify-around items-center">
                    <p className="  poppins-black text-[40px]  " id="strok">
                        Login
                    </p>
                </div>

                <div className="w-full h-[80%] p-5 flex flex-col gap-4 ">
                    <form onSubmit={handlelogin}>
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value,
                                })
                            }
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                })
                            }
                        />

                        <div className="w-full flex flex-row justify-around items-center mt-6">
                            <button className="w- rounded-2xl  flex justify-between items-center poppins-medium text-2xl text-coswhite bg-cosgreen p-5">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};
