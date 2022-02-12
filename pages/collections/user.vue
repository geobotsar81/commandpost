<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Your Collections</h1></div>

            <div class="row" v-if="userCollections">
                <div class="col-12">
                    <ul>
                        <li v-for="(collection, index) in userCollections" :key="index">
                            <NuxtLink :to="'/collections/update/' + collection.id">{{ collection.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    head: {
        title: "User Collections",
    },
    middleware: "authenticated",
    data() {
        return {
            error: "",
        };
    },
    //Fetch user collections
    async fetch({ store, error }) {
        try {
            await store.dispatch("collections/fetchUserCollections", store.state.auth.user.id);
        } catch (e) {
            error({
                message: e,
            });
        }
    },
    //Load user collections from state
    computed: mapState({
        userCollections: (state) => state.collections.userCollections,
    }),
};
</script>
