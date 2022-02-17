<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center"><h1>Welcome to CommandPost!</h1></div>

            <!--Message-->
            <AppMessage :message="message" :type="messageType" />

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
import AppMessage from "~/components/AppMessage.vue";
export default {
    head: {
        title: "Welcome to CommandPost",
    },
    components: {
        AppMessage,
    },
    //Fetch Collections
    async fetch({ store }) {
        this.message = "";
        try {
            await store.dispatch("collections/fetchCollections");
        } catch (e) {
            this.message = "Could not load data at this time";
            this.messageType = "error";
        }
    },
    computed: mapState({
        collections: (state) => state.collections.collections,
    }),
    data() {
        return {
            message: "",
            messageType: "",
        };
    },
};
</script>
