<template>
    <div class="collection">
        <NuxtLink :to="'/collections/view/' + collection.id">{{ collection.title }} ({{ collection.commands.length }})</NuxtLink>
        <span class="float-end collection__links">
            <a href="#" @click.prevent="editCollection(collection.id, collection.title)"><i class="far fa-edit" title="edit"></i></a>
            <a href="#" @click.prevent="deleteCollection(collection.id)"><i class="far fa-trash-alt" title="delete"></i></a>
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
        type: {
            type: String,
            required: false,
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
        //Edit Collection
        editCollection(id, title) {
            this.$emit("editCollection", { id: id, title: title });
        },
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
                    //this.$emit("deletedCollection", true);
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
<style lang="scss" scoped>
.collection__links a {
    margin-left: 10px;
}
</style>
