<template>
    <div class="container collection">
        <template v-if="collection">
            <div class="row">
                <div class="col-12 text-center">
                    <h1>{{ collection.title }} Collection</h1>
                </div>
            </div>
            <div class="row collection__views" v-if="collection.user">
                <div class="col-12 text-center">by {{ collection.user.name }}</div>
            </div>
        </template>

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
        //Initial set of Collection through the store
        /*let collection = null;
        let commands = this.$store.state?.commands?.commands?.data ?? null;
        if (commands) {
            let command = commands.filter((command) => command.collection.encrypted_id == this.$route.params.id);
            collection = command[0].collection;
            this.collection = collection;
        }*/

        //Load Collection from the API
        try {
            await this.$store.dispatch("collections/viewUserCollection", { collectionID: this.$route.params.id });
            this.collection = this.$store.state.collections.viewCollection;
        } catch (e) {
            return this.$nuxt.error({ statusCode: 404, message: "Could not find Collection" });
        }
    },
};
</script>
<style lang="scss" scoped></style>
