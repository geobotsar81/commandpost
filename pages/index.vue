<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Welcome to CommandPost!</h1></div>
            <app-error :error="error"></app-error>
            <div class="row" v-if="collections">
                <div class="col-12">
                    <ul>
                        <li v-for="(collection, index) in collections" :key="index">{{ collection.title }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AppError from "~/components/AppError.vue";
export default {
    head: {
        title: "Welcome",
    },
    components: {
        AppError,
    },
    async asyncData({ store, error }) {
        try {
            await store.dispatch("collections/fetchCollections");
        } catch (e) {
            return {
                error: "Could not load data at this time",
            };
        }
    },
    computed: mapState({
        collections: (state) => state.collections.collections,
    }),
    data() {
        return {
            error: "",
        };
    },
};
</script>
