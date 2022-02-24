import CollectionService from "@/services/CollectionService.js";

export const state = () => ({
    collections: null,
    collection: null,
    viewCollection: null,
    userCollections: null,
});
export const mutations = {
    SET_COLLECTIONS(state, collections) {
        state.collections = collections;
    },
    SET_COLLECTION(state, collection) {
        state.collection = collection;
    },
    SET_VIEW_COLLECTION(state, collection) {
        state.viewCollection = collection;
    },
    SET_USER_COLLECTIONS(state, collections) {
        state.userCollections = collections;
    },
};
export const actions = {
    fetchCollections({ commit }) {
        return CollectionService.getCollections().then((response) => {
            commit("SET_COLLECTIONS", response.data);
        });
    },
    fetchUserCollection({ commit }, data) {
        return CollectionService.getUserCollection(data.userID, data.collectionID).then((response) => {
            commit("SET_COLLECTION", response.data);
        });
    },
    fetchUserCollections({ commit }, userID) {
        return CollectionService.getUserCollections(userID).then((response) => {
            commit("SET_USER_COLLECTIONS", response.data);
        });
    },
    viewUserCollection({ commit }, data) {
        return CollectionService.getUserCollection(data.userID, data.collectionID).then((response) => {
            commit("SET_VIEW_COLLECTION", response.data);
        });
    },
    addUserCollection({ commit }, data) {
        return CollectionService.addCollection(data.form).then((response) => {
            commit("SET_USER_COLLECTIONS", response.data);
        });
    },
    updateUserCollection({ commit }, data) {
        return CollectionService.updateCollection(data.form, data.collectionID).then((response) => {
            commit("SET_USER_COLLECTIONS", response.data);
        });
    },
    deleteUserCollections({ commit }, data) {
        return CollectionService.deleteCollection(data.form, data.collectionID).then((response) => {
            commit("SET_USER_COLLECTIONS", response.data);
        });
    },
};
