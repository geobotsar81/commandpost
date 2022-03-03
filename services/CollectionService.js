import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json ",
        "Access-Control-Max-Age": 600,
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
    sortUserCollections(userID, data) {
        return apiClient.post("/api/collections/sort/" + userID, data);
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
