<template>
    <div>
        <!--Message-->
        <AppMessage :message="message" :type="messageType" />

        <div class="row mt-4" v-if="commands && commands.length > 0">
            <div class="col-12">
                <!--Search Form-->
                <div class="row mt-5">
                    <div class="col-12">
                        <form id="searchForm" @submit.prevent="searchCommands">
                            <div class="row">
                                <div class="col-sm-8">
                                    <label for="searchCommands">Search commands</label>
                                    <input id="searchCommands" type="text" v-model="searchFilter" class="form-control searchCommands" placeholder="Type command or collection" />
                                </div>
                                <div class="col-sm-4">
                                    <label for="sortCommands">Sort commands by</label>
                                    <select id="sortCommands" v-model="sortFilter" class="form-select" aria-label="Sort movies by">
                                        <option value="1" selected>Date added</option>
                                        <option value="2">Title</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!--Preloader-->
                <div class="row" v-if="searching && !searching">
                    <div class="col-12"><img src="img/LoaderIcon.gif" /></div>
                </div>

                <!--Commands-->
                <div class="row" v-for="(command, index) in commands" :key="index">
                    <div class="col-12">
                        <AppCommand @showMessage="displayMessage" @deletedCommand="refreshCommands" :command="command" />
                    </div>
                </div>

                <!--Pagination-->
                <div class="row mt-4">
                    <div class="col-12"><AppPagination @changePage="changePage" :currentPage="currentPage" :links="paginationLinks" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AppMessage from "~/components/AppMessage.vue";
import AppCommand from "~/components/AppCommand.vue";

export default {
    head: {
        title: "Welcome to CommandPost",
    },
    components: {
        AppMessage,
        AppCommand,
    },
    //Fetch Latest Commands
    async fetch() {
        this.message = "";
        try {
            await this.$store.dispatch("commands/fetchCommands", { sort: 1, search: "", page: 1 });
        } catch (e) {
            this.message = "Could not load data at this time";
            this.messageType = "error";
        }
    },
    computed: mapState({
        commands: (state) => state.commands.commands.data,
        paginationLinks: (state) => state.commands.commands.links,
    }),
    data() {
        return {
            message: "",
            messageType: "",
            sort: 3,
            search: "",
            currentPage: 1,
            searchFilter: "",
            sortFilter: 1,
            searching: false,
        };
    },
    methods: {
        refreshCommands() {
            this.userCommands = this.$store.state.commands.userCommands;
        },
        //Display a message from the commands component
        displayMessage(message) {
            this.message = message.message;
            this.messageType = message.type;
        },
        //List for emits from pagination and change the current page
        changePage(page) {
            this.currentPage = page;
        },
        //Search for commands
        searchCommands() {
            this.currentPage = 1;
            this.getCommands();
        },
        //Get the commands
        async getCommands() {
            this.searching = true;
            await this.$store.dispatch("commands/fetchCommands", { sort: this.sortFilter, search: this.searchFilter, page: this.currentPage });
        },
    },
    watch: {
        searchFilter: function (val) {
            this.searchCommands();
        },
        sortFilter: function (val) {
            this.searchCommands();
        },
        currentPage: function (val) {
            this.getCommands();
        },
    },
};
</script>
<style lang="scss" scoped></style>
