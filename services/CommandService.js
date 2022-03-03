import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json ",
        //"X-Requested-With": "XMLHttpRequest",
        "Access-Control-Max-Age": "600",
    },
});

export default {
    //Not authenticated routes
    getCommands(data) {
        if (document.cookie.indexOf("XSRF-TOKEN") > -1) {
            return apiClient.post("/api/commands/index", data);
        } else {
            return apiClient.get(process.env.backendUrl + "/sanctum/csrf-cookie").then((response) => {
                return apiClient.post("/api/commands/index", data);
            });
        }
    },
    getCollectionCommands(collectionID, data) {
        if (document.cookie.indexOf("XSRF-TOKEN") > -1) {
            return apiClient.post("/api/commands/collection/" + collectionID, data);
        } else {
            return apiClient.get(process.env.backendUrl + "/sanctum/csrf-cookie").then((response) => {
                return apiClient.post("/api/commands/collection/" + collectionID, data);
            });
        }
    },

    //Authenticated routes
    sortCollectionCommands(collectionID, data) {
        return apiClient.post("/api/commands/sort/" + collectionID, data);
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
