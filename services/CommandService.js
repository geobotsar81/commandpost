import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.backendUrl,
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default {
    getCommands(data) {
        return apiClient.get(process.env.backendUrl + "/sanctum/csrf-cookie").then((response) => {
            /*const config = {
                headers: {
                    "X-XSRF-TOKEN": response,
                },
            };*/
            //console.log(JSON.stringify(response));
            return apiClient.post("/api/commands/index", data);
            //return axios.post(process.env.backendUrl + "/api/commands/index", data, config);
        });

        //return apiClient.post("/api/commands/index", data);
    },
    getUserCommands(userID) {
        return apiClient.get("/api/commands/users/" + userID);
    },
    getUserCommand(userID, commandID) {
        return apiClient.get("/api/commands/users/" + userID + "/" + commandID);
    },
    getCollectionCommands(collectionID, data) {
        return apiClient.post("/api/commands/collection/" + collectionID, data);
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
