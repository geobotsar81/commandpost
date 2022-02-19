import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl + "/api",
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
    getUserCollections(userID) {
        return apiClient.get("/collections/users/" + userID);
    },
    getUserCollection(userID, collectionID) {
        return apiClient.get("/collections/users/" + userID + "/" + collectionID);
    },
    addCollection(data) {
        return apiClient.post("/collections/store", data);
    },
    updateCollection(data, collectionID) {
        return apiClient.post("/collections/update/" + collectionID, data);
    },
    deleteCollection(data, collectionID) {
        return apiClient.post("/collections/destroy/" + collectionID, data);
    },
};
