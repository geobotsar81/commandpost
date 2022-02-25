import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl,
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default {
    //Not authenticated routes
    getCommands(data) {
        return apiClient.get(process.env.backendUrl + "/sanctum/csrf-cookie").then((response) => {
            return apiClient.post("/api/commands/index", data);
        });
    },
    getCollectionCommands(collectionID, data) {
        return apiClient.get(process.env.backendUrl + "/sanctum/csrf-cookie").then((response) => {
            return apiClient.post("/api/commands/collection/" + collectionID, data);
        });
    },
    //Authenticated routes
    getUserCommands(userID) {
        return apiClient.get("/api/commands/users/" + userID);
    },
    getUserCommand(userID, commandID) {
        return apiClient.get("/api/commands/users/" + userID + "/" + commandID);
    },

    addCommand(data) {
        return apiClient.post("/api/commands/store", data);
    },
    updateCommand(data, commandID) {
        return apiClient.post("/api/commands/update/" + commandID, data);
    },
    deleteCommand(data, commandID) {
        return apiClient.post("/api/commands/destroy/" + commandID, data);
    },
};
