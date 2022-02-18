<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center"><h1>Welcome to CommandPost!</h1></div>
        </div>
        <div class="row"><div class="col-12 text-center">A place for web devs to store their commands</div></div>
        <div class="row mt-4">
            <div class="col-12"><AppPaginatedCommands /></div>
        </div>
    </div>
</template>

<script>
import AppPaginatedCommands from "~/components/AppPaginatedCommands.vue";

export default {
    head: {
        title: "Welcome to CommandPost",
    },
    components: {
        AppPaginatedCommands,
    },
    //Fetch Collections
    async fetch({ store }) {
        this.message = "";
        try {
            await store.dispatch("commands/fetchCommands", { sort: 1, search: "" });
        } catch (e) {
            this.message = "Could not load data at this time";
            this.messageType = "error";
        }
    },
};
</script>
