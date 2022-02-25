<template>
    <div class="container collection">
        <div class="row" v-if="collection">
            <div class="col-12 text-center">
                <h1>{{ collection.title }} Collection</h1>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12"><AppPaginatedCommands type="collection" /></div>
        </div>
    </div>
</template>

<script>
import AppPaginatedCommands from "~/components/AppPaginatedCommands.vue";

export default {
    head() {
        return {
            title: this.collection?.title + " Collection",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Find " + this.collection?.title + " commands in the " + this.collection?.title + "Collection",
                },
            ],
        };
    },
    components: {
        AppPaginatedCommands,
    },
    data() {
        return {
            processing: false,
            message: "",
            messageType: "",
            collection: null,
        };
    },
    //Get the current Collection along with its Commands
    async fetch() {
        try {
            await this.$store.dispatch("collections/viewUserCollection", { collectionID: this.$route.params.id });
            this.collection = this.$store.state.collections.viewCollection;
        } catch (e) {}
    },
};
</script>
<style lang="scss" scoped></style>
