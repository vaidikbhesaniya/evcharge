import create from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
export const Store = create((set) => ({
    SidebarOpen: false,
    setSidebarOpen: (state) => set({ SidebarOpen: state }),

    stations: [],
    setStations: (state) => set({ stations: state }),

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

    getUser: async () => {
        const { user } = Store.getState();

        await axios
            .get("/api/v1/user")
            .then((res) => {
                Store.getState().setUser(res.data.user);
                console.log(Store.getState().user);
            })
            .catch((err) => {
                if (err.response)
                    return toast.error(err.response?.data?.message);
            })
            .finally(() => {
                // set({ isLoading: false });
            });
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
}));
