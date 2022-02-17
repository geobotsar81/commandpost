<template>
    <div>
        {{ collection.title }} - {{ collection.commands.length }} commands
        <span class="float-end">
            <NuxtLink :to="'/collections/update/' + collection.id">Edit</NuxtLink> | <NuxtLink :to="'/collections/view/' + collection.id">View Commands</NuxtLink> |
            <a href="#" @click.prevent="deleteCollection(collection.id)">Delete</a>
        </span>
    </div>
</template>

<script>
import AppLoader from "~/components/AppLoader.vue";

export default {
    components: {
        AppLoader,
    },
    props: {
        collection: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            form: {
                userID: this.$auth.user.id,
            },
            processing: false,
        };
    },
    methods: {
        //Delete a Collection
        async deleteCollection(collectionID) {
            this.processing = true;
            this.message = "";

            if (this.collection.commands.length != 0) {
                this.$emit("showMessage", { message: "You will need to delete any commands in this Collection, in order to be able to delete it.", type: "error" });
            } else {
                try {
                    await this.$store.dispatch("collections/deleteUserCollections", { form: this.form, collectionID: collectionID });
                    this.processing = false;
                    this.userCollections = this.$store.state.collections.userCollections;
                    this.$emit("deletedCollection", true);
                    this.$emit("showMessage", { message: "Collection deleted successfully", type: "success" });
                } catch (e) {
                    this.processing = false;
                    this.$emit("showMessage", { message: e, type: "error" });
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped></style>
