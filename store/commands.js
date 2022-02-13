import CommandService from "@/services/CommandService.js";

export const state = () => ({
    commands: [],
    command: null,
});
export const mutations = {
    SET_COMMANDS(state, commands) {
        state.commands = commands;
    },
    SET_COMMAND(state, command) {
        state.command = command;
    },
    SET_USER_COMMANDS(state, commands) {
        state.userCommands = commands;
    },
};
export const actions = {
    fetchCommands({ commit }) {
        return CommandService.getCommands().then((response) => {
            commit("SET_COMMANDS", response.data);
        });
    },
    fetchUserCommand({ commit }, data) {
        return CommandService.getUserCommand(data.userID, data.commandID).then((response) => {
            commit("SET_COMMAND", response.data);
        });
    },
    fetchUserCommands({ commit }, userID) {
        return CommandService.getUserCommands(userID).then((response) => {
            commit("SET_USER_COMMANDS", response.data);
        });
    },
    updateUserCommand({ commit }, data) {
        return CommandService.updateCommand(data.form, data.commandID).then((response) => {
            commit("SET_COMMAND", response.data);
        });
    },
    deleteUserCommands({ commit }, data) {
        return CommandService.deleteCommand(data.form, data.commandID).then((response) => {
            commit("SET_USER_COMMANDS", response.data);
        });
    },
};
