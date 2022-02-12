<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Your Collections</h1></div>

            <div class="row" v-if="userCollections">
                <div class="col-12">
                    <ul>
                        <li v-for="(collection, index) in userCollections" :key="index">
                            <NuxtLink :to="'/collections/update/' + collection.id">{{ collection.title }}</NuxtLink>
                            |
                            <a href="#" @click.prevent="deleteCollection(collection.id)">Delete</a>
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
    methods: {
        //Delete a Collection
        async deleteCollection(collectionID) {
            this.processing = true;
            this.success = "";

            try {
                await this.$store.dispatch("collections/deleteUserCollections", { form: this.form, collectionID: collectionID });
                this.processing = false;
                this.userCollections = this.$store.state.collections.userCollections;
            } catch (e) {
                alert(e);
            }
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
    data() {
        return {
            form: {
                user_id: this.$auth.user.id,
            },
            userCollections: this.$store.state.collections.userCollections,
        };
    },
};
</script>
