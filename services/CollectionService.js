import axios from "axios";

const apiClient = axios.create({
    baseURL: `http://localhost:8001/api`,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default {
    getCollections() {
        return apiClient.get("/collections/index");
    },
    getCollection(id) {
        return apiClient.get("/collections/" + id);
    },
};
