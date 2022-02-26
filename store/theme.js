export const state = () => ({
    currentTheme: 1,
});
export const mutations = {
    SET_THEME(state, theme) {
        state.currentTheme = theme;
    },
};
export const actions = {
    setTheme({ commit }, theme) {
        commit("SET_THEME", theme);
    },
};