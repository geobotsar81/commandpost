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
    getCommands(data) {
        return apiClient.post("/commands/index", data);
    },
    getUserCommands(userID) {
        return apiClient.get("/commands/users/" + userID);
    },
    getUserCommand(userID, commandID) {
        return apiClient.get("/commands/users/" + userID + "/" + commandID);
    },
    getCollectionCommands(collectionID, data) {
        return apiClient.post("/commands/collection/" + collectionID, data);
    },
    addCommand(data) {
        return apiClient.post("/commands/store", data);
    },
    updateCommand(data, commandID) {
        return apiClient.post("/commands/update/" + commandID, data);
    },
    deleteCommand(data, commandID) {
        return apiClient.post("/commands/destroy/" + commandID, data);
    },
};
