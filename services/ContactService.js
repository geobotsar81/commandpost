import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl,
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default {
    sendEmail(data) {
        return apiClient.get(process.env.backendUrl + "/sanctum/csrf-cookie").then((response) => {
            return apiClient.post("/api/contact", data);
        });
    },
};
