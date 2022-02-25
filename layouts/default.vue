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
};
</script>
<style lang="scss" scoped>
.siteContainer {
    padding: 0px;
    overflow: hidden;
}
</style>
