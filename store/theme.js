import ThemeService from "@/services/ThemeService.js";

export const state = () => ({
    currentTheme: 2,
    showMobileMenu: false,
});
export const mutations = {
    SET_THEME(state, theme) {
        state.currentTheme = theme;
    },
    SET_MOBILE_MENU(state, showMenu) {
        state.showMobileMenu = showMenu;
    },
};
export const actions = {
    fetchUserTheme({ commit }, data) {
        return ThemeService.getUserTheme(data.userID).then((response) => {
            commit("SET_THEME", response.data);
        });
    },
    setUserTheme({ commit }, data) {
        return ThemeService.setUserTheme(data.userID, data).then((response) => {
            commit("SET_THEME", response.data);
        });
    },
    setGuestTheme({ commit }, theme) {
        commit("SET_THEME", theme);
    },
    setMobileMenu({ commit }, showMenu) {
        commit("SET_MOBILE_MENU", showMenu);
    },
};
