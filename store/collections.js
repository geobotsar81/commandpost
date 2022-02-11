import CollectionService from "@/services/CollectionService.js";
export const state = () => ({
    collections: [],
});
export const mutations = {
    SET_COLLECTIONS(state, collections) {
        state.collections = collections;
    },
};
export const actions = {
    fetchCollections({ commit }) {
        return CollectionService.getCollections().then((response) => {
            commit("SET_COLLECTIONS", response.data);
        });
    },
};
