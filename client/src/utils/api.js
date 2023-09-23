import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { api_url } from "../config/api";

export const api = axios.create({
    baseURL: `${api_url}/api`,
});

export const getAllProperties = async () => {
    try {
        const res = await api.get("/residency/allresd", {
            timeout: 10 * 1000,
        });
        if (res.statusCode === 400 || res.statusCode === 500) {
            throw res.data;
        }
        return res.data;
    } catch (error) {
        toast.error("Error getting properties");
        throw error;
    }
};

export const getProperty = async (id) => {
    try {
        const res = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000,
        });
        if (res.statusCode === 400 || res.statusCode === 500) {
            throw res.data;
        }
        return res.data;
    } catch (error) {
        toast.error("Error getting property");
        throw error;
    }
};

export const createUser = async (email, token) => {
    try {
        await api.post(
            `/user/register`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

export const bookVisit = async (date, propertyId, email, token) => {
    try {
        await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: dayjs(date).format("DD/MM/YYYY"),
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error(error);
        throw error;
    }
};

export const removeBooking = async (id, email, token) => {
    try {
        await api.post(
            `/user/cancelBook/${id}`,
            { email },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

export const toFav = async (id, email, token) => {
    try {
        await api.post(
            `/user/fav/${id}`,
            { email },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

export const getAllFav = async (email, token) => {
    if (!token) {
        return;
    }

    try {
        const res = await api.post(
            `/user/allFav`,
            { email },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data["favResidenciesID"];
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

export const getAllBookings = async (email, token) => {
    if (!token) {
        return;
    }

    try {
        const res = await api.post(
            `/user/allBookings`,
            { email },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

export const createResidency = async (data, token) => {
    console.log(data);
    try {
        const res = await api.post(
            `/residency/create`,
            {
                data,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
};


