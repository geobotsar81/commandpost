import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl,
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default {
    getCollections() {
        return apiClient.get("/api/collections/index");
    },
    getUserCollections(userID) {
        return apiClient.get("/api/collections/users/" + userID);
    },
    getUserCollection(userID, collectionID) {
        return apiClient.get("/api/collections/users/" + userID + "/" + collectionID);
    },
    getCollection(collectionID) {
        return apiClient.get("/api/collections/" + collectionID);
    },
    addCollection(data) {
        return apiClient.post("/api/collections/store", data);
    },
    updateCollection(data, collectionID) {
        return apiClient.post("/api/collections/update/" + collectionID, data);
    },
    deleteCollection(data, collectionID) {
        return apiClient.post("/api/collections/destroy/" + collectionID, data);
    },
};
