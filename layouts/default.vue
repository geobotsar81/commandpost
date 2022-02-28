<template>
    <div class="container-fluid siteContainer" :class="theme">
        <div class="row">
            <div class="col-md-4 col-lg-3 pe-0 ps-0"><TheSideMenu /></div>
            <div class="col-md-8 col-lg-9 pe-0 ps-0">
                <TheMain>
                    <Nuxt />
                </TheMain>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            theme: this.$store.state.theme.currentTheme ? "theme" + this.$store.state.theme.currentTheme : "theme1",
        };
    },
    methods: {
        //Select Theme
        async getUserTheme() {
            try {
                await this.$store.dispatch("theme/fetchUserTheme", { userID: this.$store.state.auth.user.id });
                this.theme = "theme" + this.$store.state.theme.currentTheme;
            } catch (e) {
                this.showToast("Could not switch Theme");
            }
        },
    },
    watch: {
        //Watch if selected theme has changed
        "$store.state.theme.currentTheme": function (val) {
            this.theme = "theme" + this.$store.state.theme.currentTheme;
        },
        //Watch if user has logged in
        "$store.state.auth.user": function (val) {
            if (this.$auth?.user) {
                this.getUserTheme();
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.siteContainer {
    padding: 0px;
    overflow: hidden;
}
</style>
