<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Welcome to CommandPost!</h1></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    head: {
        title: "Welcome",
    },

    async fetch({ store, error }) {
        try {
            await store.dispatch("collections/fetchCollections");
        } catch (e) {
            error({
                statusCode: 503,
                message: "Unable to fetch collection at this time",
            });
        }
    },
    computed: mapState({
        collections: (state) => state.collections.collections,
    }),
    data() {
        return {};
    },
};
</script>
