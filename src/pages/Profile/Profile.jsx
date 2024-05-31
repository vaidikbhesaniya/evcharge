import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import Input from "../../components/Input";
import { Store } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import profileImage from "../../assets/profile/profile.png";
import username from "../../assets/profile/username.png";
import email from "../../assets/profile/email.png";
import phone from "../../assets/profile/phone.png";
import edit from "../../assets/profile/edit.png";
import back from "../../assets/profile/back.png";
function Profile() {
    const store = Store();
    const [isediting, setisediting] = useState(false);
    const [profilePicture, setProfilePicture] = useState(
        store.user?.profilePicture
    );
    const [profilePreview, setProfilePreview] = useState(null);
    const navigate = useNavigate();
    const [updataeUser, setupdataeUser] = useState({
        userName: store.user?.userName,
        email: store.user?.email,
        phoneno: store.user?.phoneno,
    });
    const fileInputRef = useRef(null);
    useEffect(() => {
        async function fetchData() {
            await store.getUser(navigate);
        }
        if (store.user === undefined) {
            fetchData();
        }
    }, []);

    console.log(updataeUser);

    const register = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("userName", updataeUser.userName);
        formData.append("email", updataeUser.email);
        formData.append("phoneno", updataeUser.phoneno);
        formData.append("profilePicture", profilePicture);
        console.log(formData);
        store.updateUser(formData);
    };

    function handleProfileChange(e) {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setProfilePicture(file);
            setProfilePreview(URL.createObjectURL(file));
        }
    }

    function handleProfileClicked() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-[100dvh] border-solid"
        >
            <div
                className="w-full h-[90%] m-auto overflow-hidden bg-[#1b1b1b] 
            "
            >
                <div className="w-full  h-[10%] bg-[#1b1b1b] rounded-b-md flex flex-col justify-center items-center  backdrop-blur-2xl ">
                    <div className="w-[90%] h-[20%] flex flex-row justify-between items-center   relative rounded-2xl  text-center">
                        {isediting && (
                            <motion.img
                                initial={{ scale: 0 }}
                                animate={{ rotate: 360, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                }}
                                src={back}
                                className="w-[30px]"
                                onClick={() => setisediting(false)}
                                alt=""
                            />
                        )}
                        <p className="text-coswhite poppins-medium pl-5">
                            Profile
                        </p>
                        <div className="w-full flex flex-col justify-end items-end">
                            {!isediting && (
                                <motion.img
                                    initial={{ scale: 0 }}
                                    animate={{ rotate: 360, scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    }}
                                    src={edit}
                                    onClick={() => setisediting(true)}
                                    className="w-[30px]"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>

                {isediting ? (
                    <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        className="w-full h-[90%]  bg-grad "
                    >
                        <div className="w-full h-[30%] p-5 flex flex-col gap-4 ">
                            <div
                                className="flex justify-center items-center"
                                onClick={handleProfileClicked}
                            >
                                {profilePreview ? (
                                    <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                                        <img
                                            className="w-[100px] h-[100px] rounded-[50%]"
                                            src={profilePreview}
                                            alt="profileImage"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                                        <img
                                            className="w-[100px] h-[100px] rounded-[50%]"
                                            src={
                                                store.user?.profilePicture
                                                    ? store.user.profilePicture
                                                    : profileImage
                                            }
                                            alt="profileImage"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    ref={fileInputRef}
                                    onChange={handleProfileChange}
                                />
                            </div>
                        </div>
                        <div className="w-full h-[50%] p-5 flex flex-col gap-4 ">
                            <form onSubmit={register}>
                                <Input
                                    className=""
                                    id="name"
                                    type="text"
                                    label="Username"
                                    value={updataeUser.userName}
                                    onChange={(e) =>
                                        setupdataeUser({
                                            ...updataeUser,
                                            userName: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    label="Email"
                                    value={updataeUser?.email}
                                    onChange={(e) =>
                                        setupdataeUser({
                                            ...updataeUser,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    id="phoneno"
                                    type="phoneno"
                                    label="Phone. no."
                                    value={updataeUser?.phoneno}
                                    onChange={(e) =>
                                        setupdataeUser({
                                            ...updataeUser,
                                            phoneno: e.target.value,
                                        })
                                    }
                                />

                                <div className="w-full flex flex-row justify-around items-center mt-6">
                                    <button
                                        className="w- rounded-2xl  flex justify-between items-center poppins-medium text-2xl text-coswhite bg-blue-800 p-5"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        className="w-full h-[90%] bg-grad"
                    >
                        <div className="w-full h-[30%] p-5 flex flex-col gap-4 ">
                            <div
                                className="flex justify-center items-center"
                                onClick={handleProfileClicked}
                            >
                                {profilePreview ? (
                                    <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                                        <img
                                            className="w-[100px] h-[100px] rounded-[50%]"
                                            src={profilePreview}
                                            alt="profileImage"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                                        <img
                                            className="w-[100px] h-[100px] rounded-[50%]"
                                            src={
                                                store.user?.profilePicture
                                                    ? store.user.profilePicture
                                                    : profileImage
                                            }
                                            alt="profileImage"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full h-[50%]  pl-2 pr-2   text-coswhite poppins-medium">
                            <div className="solid border-2 pb-5 p-2 mb-5 border-coswhite flex items-center flex-row rounded-xl">
                                <div className="w-[20%] h-[hull] flex justify-center items-center">
                                    <img
                                        className="w-[37px]"
                                        src={username}
                                        alt=""
                                    />
                                </div>
                                <div className="w-[80%] h-full flex  justify-center flex-col">
                                    <div className="w-[50%] h-full">
                                        Username:
                                    </div>
                                    <div>{store.user?.userName}</div>
                                    <p className="text-[10px]">
                                        This is your Unique username. this will
                                        be visible to our ev station partners
                                    </p>
                                </div>
                            </div>
                            <div className="solid border-2 pb-5 p-2 mb-5 border-coswhite flex items-center flex-row rounded-xl">
                                <div className="w-[20%] h-[hull] flex justify-center items-center">
                                    <img
                                        className="w-[37px]"
                                        src={email}
                                        alt=""
                                    />
                                </div>

                                <div className="w-[80%] h-full flex  justify-center flex-col">
                                    <div className="w-[50%] h-full">Email:</div>
                                    <div>{store.user?.email}</div>
                                </div>
                            </div>
                            <div className="solid border-2 pb-5 p-2 mb-5 border-coswhite flex items-center flex-row rounded-xl">
                                <div className="w-[20%] h-[hull] flex justify-center items-center">
                                    <img
                                        className="w-[37px]"
                                        src={phone}
                                        alt=""
                                    />
                                </div>
                                <div className="w-[80%] h-full flex  justify-center flex-col">
                                    <div className="w-[50%] h-full">
                                        Phone no:
                                    </div>
                                    <div>{store.user?.phoneno}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            <Navbar />
        </motion.div>
    );
}

export default Profile;
