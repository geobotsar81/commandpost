<template>
    <div class="collection">
        <NuxtLink :to="'/collections/view/' + collection.encrypted_id">{{ collection.title }} ({{ collection.commands.length }})</NuxtLink>
        <!--Loader-->
        <AppLoader v-if="processing" />
        <span v-else class="float-end collection__links">
            <i class="far fa-grip-lines sort" title="sort"></i>
            <a href="#" @click.prevent="editCollection(collection.id)"><i class="far fa-edit" title="edit"></i></a>
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
        async editCollection(id) {
            await this.$store.dispatch("collections/fetchUserCollection", { userID: this.form.userID, collectionID: id });
        },
        //Delete a Collection
        async deleteCollection(collectionID) {
            this.processing = true;
            this.message = "";

            if (this.collection.commands.length != 0) {
                this.$emit("showToast", "You will need to delete any commands in this Collection, in order to be able to delete it.");
            } else {
                try {
                    await this.$store.dispatch("collections/deleteUserCollections", { form: this.form, collectionID: collectionID });
                    this.processing = false;
                    this.userCollections = this.$store.state.collections.userCollections;
                    //this.$emit("deletedCollection", true);
                    this.$emit("showToast", "Collection deleted successfully");
                } catch (e) {
                    this.processing = false;
                    this.$emit("showToast", e);
                }
            }
        },
    },
};
</script>
