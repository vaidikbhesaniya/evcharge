import create from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
export const Store = create((set) => ({
    SidebarOpen: false,
    setSidebarOpen: (state) => set({ SidebarOpen: state }),

    allstation: false,
    setallstation: (state) => set({ allstation: state }),

    issearch: false,
    setissearch: (state) => set({ issearch: state }),

    isclickondirection: false,
    setisclickondirection: (state) => set({ isclickondirection: state }),

    location: [],
    setlocation: (state) => set({ location: state }),

    reviews: [],
    setreviews: (state) => set({ reviews: state }),

    bookmarks: [],
    setbookmarks: (state) => set({ bookmarks: state }),

    stations: [],
    setStations: (newStations) =>
        set((state) => ({ stations: [...state.stations, ...newStations] })),

    user: undefined,
    setUser: (state) => set({ user: state }),

    handleGetstations: async () => {
        await axios
            .get("/api/v1/stations")
            .then((res) => {
                const { setStations } = Store.getState();
                setStations(res.data);
            })

            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error(
                        "An error occurred while fetching gas stations."
                    );
                }
            });
    },

    handleRegister: async (formData, redirect) => {
        // set({ isLoading: true });

        await axios
            .post("/api/v1/user/register", formData)
            .then((res) => {
                toast.success(res.data?.message);

                // set({ isLoggedIn: true });
                setTimeout(() => redirect("/Home"), 1000);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
                return toast.error("Internal server error");
            })
            .finally(() => {
                // set({ isLoading: true });
            });
    },

    verifyEmail: async (formData, redirect) => {
        const { handleRegister } = Store.getState();

        // set({ isLoading: true });

        const OTP = formData;

        await axios
            .post(`api/v1/user/verifyOtp`, { userOtp: OTP })
            .then((res) => {
                Cookies.remove("userEmail");
                handleRegister(formData, redirect);
                toast.success(res.data?.message);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    sendEmailVerificationMail: async (formData, navigate) => {
        // set({ isLoading: true });

        await axios
            .post("api/v1/user/sendVerificationMail", formData)
            .then((res) => {
                toast.success(res.data?.message);
                navigate("/UserVerification");
                const email = formData.get("email");

                if (email) {
                    Cookies.set("userEmail", email);
                }
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
                // return toast.error("Internal server error");
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    handleLogin: async (formData, redirect) => {
        // set({ isLoading: true });

        await axios
            .post("api/v1/user/login", formData)
            .then((res) => {
                toast.success(res.data?.message);
                Store.getState().handleGetstations();
                redirect("/Home");
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
                return toast.error("Internal server error");
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    getUser: async (navigate) => {
        const { user } = Store.getState();

        if (user == undefined) {
            await axios
                .get("/api/v1/user")
                .then((res) => {
                    Store.getState().setUser(res.data.user);
                    // console.log(Store.getState().user);
                    navigate("/home");
                })
                .catch((err) => {
                    navigate("/");
                    if (err.response)
                        return toast.error(err.response?.data?.message);
                })
                .finally(() => {
                    // set({ isLoading: false });
                });
        }
    },

    updateUser: async (formData) => {
        await axios
            .put("/api/v1/user/update", formData)
            .then((res) => {
                toast.success(res.data?.message);
                Store.getState().setUser(res.data.user);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    getstation: async (offset) => {
        if (offset < 2100) {
            await axios
                .get(`/station/${offset}`)
                .then((res) => {
                    // toast.success(res.data?.message);
                    // console.log("====================================");
                    // console.log(`${offset}`, res.data);
                    // console.log("====================================");
                    // Store.getState().setStation(res.data);
                    // console.log("====================================");
                    // console.log(Store.getState().stations);
                    // console.log("====================================");
                    // Store.getState().setUser(res.data.user);
                    Store.getState().setStations(res.data);
                    // console.log(Store.getState().stations);

                    localStorage.setItem(
                        "stations",
                        JSON.stringify(Store.getState().stations)
                    );
                    // console.log(offset);
                })
                .catch((err) => {
                    if (err.response)
                        return toast.error(err.response?.data?.message);
                })
                .finally(() => {
                    // set({ isLoading: false });
                });
        }
    },

    handleallstations: async () => {
        console.log("request trigger");
        await axios
            .get(`/stationall`)
            .then((res) => {
                localStorage.setItem("stationsall", JSON.stringify(res.data));
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                console.log("request complated");
            });
    },

    handlelogout: async (navigate) => {
        await axios
            .post("/api/v1/user/logout")
            .then((res) => {
                toast.success(res.data?.message);
                Cookies.remove("token");
                navigate("/");
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    addbookmark: async (data) => {
        await axios
            .post("/api/v1/bookmark/add", data)
            .then((res) => {
                toast.success(res.data?.message);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    getbookmark: async () => {
        await axios
            .get("/api/v1/bookmarks")
            .then((res) => {
                // toast.success("success");
                Store.getState().setbookmarks(res.data.stations);
                localStorage.setItem(
                    "bookmarks",
                    JSON.stringify(Store.getState().bookmarks)
                );
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    removebookmark: async (data) => {
        await axios
            .delete("/api/v1/bookmark/remove", data)
            .then((res) => {
                toast.success(res.data?.message);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },

    removereview: async (data) => {
        await axios
            .post("/api/v1/review/delete", data)
            .then((res) => {
                toast.success(res.data?.message);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },
    addreview: async (data) => {
        await axios
            .post("/api/v1/review/add", data)
            .then((res) => {
                toast.success(res.data?.message);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },
    getreview: async (data) => {
        await axios
            .post("/api/v1/reviews", data)
            .then((res) => {
                Store.getState().setreviews(res.data);
                console.log("====================================");
                console.log(res.data);
                console.log("====================================");
                localStorage.setItem(
                    "reviews",
                    JSON.stringify(Store.getState().reviews)
                );
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
    },
}));
