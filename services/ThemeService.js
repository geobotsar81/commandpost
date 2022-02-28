import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl,
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default {
    //Authenticated routes
    getUserTheme(userID) {
        return apiClient.get("/api/theme/" + userID);
    },
    setUserTheme(userID, data) {
        return apiClient.post("/api/theme/" + userID, data);
    },
};
