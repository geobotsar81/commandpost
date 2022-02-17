<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <NuxtLink to="/">
                        <AppLogo :key="footer" />
                    </NuxtLink>
                </div>
                <div class="col-sm-8 footer__copyrights">© All rights reserved - {{ currentYear }}</div>
            </div>
        </div>
    </footer>
</template>
<script>
import AppLogo from "~/components/AppLogo.vue";
export default {
    components: {
        AppLogo,
    },
    data() {
        return {
            currentYear: 2022,
        };
    },
};
</script>
<style lang="scss" scoped>
.footer {
    padding: 10px 0px;
    color: #fff;
    background-color: $appBlack;

    ::v-deep .logo {
        color: #fff !important;
        font-size: 40px;
        font-weight: 700;
    }
}
.footer__copyrights {
    font-size: 16px;
    margin-top: 20px;
    text-align: right;
}
</style>
