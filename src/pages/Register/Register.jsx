import evcharge from "../../assets/evcharge.gif";
import { motion } from "framer-motion";
import Input from "../../components/Input";
import { useState } from "react";
import { Store } from "../../store/store";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const navigate = useNavigate();
    const store = Store();
    const [registerData, setRegisterData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const register = (e) => {
        e.preventDefault();
        store.handleRegister(
            {
                userName: registerData.userName,
                email: registerData.email,
                password: registerData.password,
            },
            navigate
        );
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
                        Register
                    </p>
                </div>

                <div className="w-full h-[80%] p-5 flex flex-col gap-4 ">
                    <form onSubmit={register}>
                        <Input
                            id="name"
                            type="text"
                            label="Username"
                            value={registerData.userName}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    userName: e.target.value,
                                })
                            }
                        />
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            value={registerData.email}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    email: e.target.value,
                                })
                            }
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            value={registerData.password}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    password: e.target.value,
                                })
                            }
                        />

                        <div className="w-full flex flex-row justify-around items-center mt-6">
                            <button
                                className="w- rounded-2xl  flex justify-between items-center poppins-medium text-2xl text-coswhite bg-cosgreen p-5"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};
