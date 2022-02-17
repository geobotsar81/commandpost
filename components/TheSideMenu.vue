<template>
    <div class="sideMenu">
        <div class="row">
            <div class="col-12">
                <NuxtLink to="/">
                    <AppLogo />
                </NuxtLink>
            </div>
        </div>

        <div class="row mt-4 sideMenu__links">
            <div class="col-12">
                <ul>
                    <li><NuxtLink to="/home"> Home </NuxtLink></li>
                    <template v-if="$auth.loggedIn">
                        <li><NuxtLink to="/dashboard"> Dashboard </NuxtLink></li>
                        <div class="d-inline dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Collections</button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li class="ps-2"><NuxtLink to="/collections/user"> My Collections </NuxtLink></li>
                                <li class="ps-2"><NuxtLink to="/collections/add"> New Collection </NuxtLink></li>
                            </ul>
                        </div>
                        <div class="d-inline dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">Commands</button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <li class="ps-2"><NuxtLink to="/commands/user"> My Commands </NuxtLink></li>
                                <li class="ps-2"><NuxtLink to="/commands/add"> New Command </NuxtLink></li>
                            </ul>
                        </div>
                        <button @click.prevent="logout">Logout</button>
                    </template>

                    <template v-else>
                        <li><NuxtLink to="/login"> Log in </NuxtLink></li>
                        <li><NuxtLink to="/register"> Register </NuxtLink></li>
                    </template>
                </ul>
            </div>
        </div>

        <div class="sidemenu__copyrights">© All rights reserved - {{ currentYear }}</div>
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
    computed: {
        currentYear() {
            const d = new Date();
            let year = d.getFullYear();
            return year;
        },
    },
    methods: {
        logout() {
            this.$auth.logout();
        },
    },
};
</script>

<style lang="scss" scoped>
.sideMenu {
    padding: 15px 45px;
    background-color: $appBlack2WithOpacity;
    height: 100%;
    display: inline-block;
    position: relative;
}

.sideMenu__links {
    ul {
    }

    li {
        list-style: none;
        padding: 5px 0px;
    }

    a {
        color: $appOrange;
        font-size: 18px;
    }
}

.sidemenu__copyrights {
    position: absolute;
    left: 45px;
    bottom: 15px;
    color: $appWhite;
}
</style>
