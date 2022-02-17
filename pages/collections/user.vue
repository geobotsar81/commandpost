<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Your Collections</h1></div>

            <!--Message-->
            <AppMessage :message="message" :type="messageType" />

            <div class="row mt-4">
                <div class="col-12"><NuxtLink class="btn btn-primary" to="/collections/add"> New Collection </NuxtLink></div>
            </div>
            <div class="row mt-4" v-if="userCollections">
                <div class="col-12">
                    <ul>
                        <li class="mt-2" v-for="(collection, index) in userCollections" :key="index">
                            <AppCollection @showMessage="displayMessage" @deletedCollection="refreshCollections" :collection="collection" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppMessage from "~/components/AppMessage.vue";
import AppCollection from "~/components/AppCollection.vue";

export default {
    head: {
        title: "User Collections",
    },
    middleware: "authenticated",
    components: {
        AppMessage,
        AppCollection,
    },
    data() {
        return {
            form: {
                user_id: this.$auth.user.id,
            },
            userCollections: this.$store.state.collections.userCollections,
            message: "",
            messageType: "",
        };
    },
    methods: {
        refreshCollections() {
            this.userCollections = this.$store.state.collections.userCollections;
        },
        displayMessage(message) {
            this.message = message.message;
            this.messageType = message.type;
        },
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
};
</script>
