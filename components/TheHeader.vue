<template>
    <div>
        <header class="header">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-sm-6 col-lg-4 text-center text-sm-start">
                        <NuxtLink to="/">
                            <AppLogo />
                        </NuxtLink>
                    </div>
                    <div class="col-sm-6 col-lg-8 text-center text-sm-end">
                        <template v-if="$auth.loggedIn">
                            <NuxtLink to="/dashboard"> Dashboard </NuxtLink> |
                            <button @click.prevent="logout">Logout</button>
                        </template>

                        <template v-else>
                            <NuxtLink to="/login"> Log in </NuxtLink> |
                            <NuxtLink to="/register"> Register </NuxtLink>
                        </template>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
import AppLogo from "~/components/AppLogo.vue";
export default {
    components: {
        AppLogo,
    },
    data() {
        return {};
    },
    methods: {
        logout() {
            this.$auth.logout();
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    padding: 15px 45px;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    transition: $appTransition;
    z-index: $zindexHeader;
    border-bottom: 1px solid $appLightGrey2;
    background-color: #fff;

    a {
        color: $appRed;
    }

    i {
        font-size: 18px;
        color: $appBlack;
        margin-left: 5px;
        padding-top: 5px;
    }

    button {
        background-color: transparent;
        color: $appRed;
        border: 0px;
    }
}
@media (max-width: 575.98px) {
    .header {
        padding: 10px;
    }
}
</style>
