<template>
    <div class="container home">
        <div v-if="!auth.$state.loggedIn" class="home__login"><NuxtLink class="btn btn-secondary" to="/login">Login/Register</NuxtLink></div>

        <div class="row">
            <div class="col-12 text-center"><h1>Welcome to CommandPost!</h1></div>
        </div>
        <div class="row"><div class="col-12 text-center">A place for web devs to store their commands</div></div>
        <div class="row mt-2" v-if="!$auth.loggedIn">
            <div class="col-12 text-center"><NuxtLink to="/login">Login</NuxtLink> or <NuxtLink to="/register">Register</NuxtLink> to start adding your Commands</div>
        </div>

        <div class="row mt-4">
            <div class="col-12"><AppPaginatedCommands type="all" /></div>
        </div>
    </div>
</template>

<script>
import AppPaginatedCommands from "~/components/AppPaginatedCommands.vue";

export default {
    head: {
        title: "Welcome to CommandPost",
    },
    components: {
        AppPaginatedCommands,
    },
    async fetch() {
        //Close mobile menu
        try {
            await this.$store.dispatch("theme/setMobileMenu", false);
        } catch (e) {}
    },
    data() {
        return {
            auth: this.$auth ?? null,
        };
    },
};
</script>
<style lang="scss" scoped></style>
