<template>
    <div>
        <!--Message-->
        <AppMessage v-if="message" :message="message" :type="messageType" />

        <div class="row mt-4" v-if="commands && commands.length > 0">
            <div class="col-12">
                <!--Search Form-->
                <div class="row">
                    <div class="col-12">
                        <form id="searchForm" @submit.prevent="searchCommands">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="searchCommands">Search commands</label>
                                    <input id="searchCommands" type="text" v-model="searchFilter" class="form-control searchCommands" placeholder="Type command or collection" />
                                </div>
                                <div class="col-sm-4">
                                    <label for="sortCommands">Sort commands by</label>
                                    <select id="sortCommands" v-model="sortFilter" class="form-select" aria-label="Sort movies by">
                                        <option value="1" selected>Command &#8595;</option>
                                        <option value="2">Command &#8593;</option>
                                        <option value="3">Date &#8595;</option>
                                        <option value="4">Date &#8593;</option>
                                    </select>
                                </div>
                                <div class="col-sm-2 mt-4">
                                    <AppButton @click.prevent="searchCommands" v-if="!searching"> Search </AppButton>
                                    <AppLoader v-else></AppLoader>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="row mt-4" v-if="commands">
                    <div class="col-12">
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
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AppMessage from "~/components/AppMessage.vue";
import AppCommand from "~/components/AppCommand.vue";
import AppButton from "~/components/AppButton.vue";
import AppLoader from "~/components/AppLoader.vue";

export default {
    head: {
        title: "Welcome to CommandPost",
    },
    components: {
        AppMessage,
        AppCommand,
        AppButton,
        AppLoader,
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
            this.searching = false;
        },
    },
    watch: {
        /*searchFilter: function (val) {
            this.searchCommands();
        },
        sortFilter: function (val) {
            this.searchCommands();
        },*/
        currentPage: function (val) {
            this.getCommands();
        },
    },
};
</script>
<style lang="scss" scoped></style>
