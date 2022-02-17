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
    getCommands() {
        return apiClient.get("/commands/index");
    },
    getUserCommands(userID) {
        return apiClient.get("/commands/users/" + userID);
    },
    getUserCommand(userID, commandID) {
        return apiClient.get("/commands/users/" + userID + "/" + commandID);
    },
    getCollectionCommands(userID, collectionID) {
        return apiClient.get("/commands/collection/" + userID + "/" + collectionID);
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
