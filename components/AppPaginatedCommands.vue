<template>
    <div class="search">
        <!--Toast-->
        <AppToast ref="messageToast" :message="message" toastId="commandsToast" />

        <div class="row mt-4">
            <div class="col-12">
                <!--Search Form-->
                <div class="row">
                    <div class="col-12">
                        <form id="searchForm" @submit.prevent="searchCommands">
                            <div class="row">
                                <div class="col-md-6 col-lg-5 col-xl-6 mb-2 mb-md-0">
                                    <label for="searchCommands">Search commands</label>
                                    <input id="searchCommands" type="text" v-model="searchFilter" class="form-control searchCommands" placeholder="Type command or collection" />
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <label for="sortCommands">Sort commands by</label>
                                    <select id="sortCommands" v-model="sortFilter" class="form-select" aria-label="Sort movies by">
                                        <option value="1">Command &#8593;</option>
                                        <option value="2">Command &#8595;</option>
                                        <option value="3">Date &#8593;</option>
                                        <option value="4">Date &#8595;</option>
                                        <option v-if="type == 'collection'" value="5">Order &#8593;</option>
                                        <option v-if="type == 'collection'" value="6">Order &#8595;</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 col-xl-2 search__button">
                                    <AppButton @click.prevent="searchCommands" v-if="!searching"><i class="far fa-search"></i> Search </AppButton>
                                    <AppLoader v-else></AppLoader>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="row mt-4" v-if="commands && commands.length > 0">
                    <div class="col-12">
                        <template v-if="type == 'collection' && isUsersCollection">
                            <!--Sortable Commands-->
                            <draggable class="commandDraggable" ghost-class="commandGhost" v-model="commands" group="people" @change="sortCommands" @start="drag = true" @end="drag = false">
                                <div v-for="(command, index) in commands" :key="index">
                                    <AppCommand @showToast="showToast" :command="command" />
                                </div>
                            </draggable>
                        </template>
                        <template v-else>
                            <!--Commands-->
                            <div class="row" v-for="(command, index) in commands" :key="index">
                                <div class="col-12">
                                    <AppCommand @showToast="showToast" :command="command" />
                                </div>
                            </div>
                        </template>

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
import AppMessage from "~/components/AppMessage.vue";
import AppCommand from "~/components/AppCommand.vue";
import AppButton from "~/components/AppButton.vue";
import AppLoader from "~/components/AppLoader.vue";
import draggable from "vuedraggable";

export default {
    components: {
        AppMessage,
        AppCommand,
        AppButton,
        AppLoader,
        draggable,
    },
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    //Fetch Latest Commands on component load
    async fetch() {
        this.getCommands();
    },
    computed: {
        isUsersCollection() {
            return this.$auth?.user.id == this.$store.state.collections?.viewCollection?.user_id ? true : false;
        },
    },
    data() {
        return {
            message: "",
            currentPage: 1,
            searchFilter: "",
            sortFilter: this.type != "collection" ? 4 : 5,
            searching: false,
            commands: null,
            paginationLinks: null,
        };
    },
    methods: {
        //Sort the Collection's Commands
        async sortCommands() {
            try {
                await this.$store.dispatch("commands/sortCollectionCommands", { collectionID: this.$route.params.id, commands: this.commands });
                this.searchFilter = "";
                this.sortFilter = 5;
            } catch (e) {
                this.showToast("Could not sort commands");
            }
        },
        //Refresh commands if there is an emitted change from a command
        refreshCommands() {
            this.commands = this.$store.state.commands.commands;
        },
        //Display a message if there is an emitted message from the commands component
        showToast(message) {
            this.message = message;
            this.$refs.messageToast.showToast();
        },
        //Listen for emits from pagination and change the current page
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
            this.message = "";
            try {
                //If this is a Collection page
                if (this.type == "collection") {
                    await this.$store.dispatch("commands/fetchCollectionCommands", {
                        sort: this.sortFilter,
                        search: this.searchFilter,
                        page: this.currentPage,
                        collectionID: this.$route.params.id,
                    });
                    this.commands = this.$store.state.commands.collectionCommands.data;
                    this.paginationLinks = this.$store.state.commands.collectionCommands.links;
                    //If this is the Home page
                } else {
                    await this.$store.dispatch("commands/fetchCommands", { sort: this.sortFilter, search: this.searchFilter, page: this.currentPage });
                    this.commands = this.$store.state.commands.commands.data;
                    this.paginationLinks = this.$store.state.commands.commands.links;
                }
            } catch (e) {
                this.message = "Could not load data at this time";
                this.$refs.messageToast.showToast();
            }
            this.searching = false;
        },
    },
    watch: {
        //Watch for changes in the current page
        currentPage: function (val) {
            this.getCommands();
        },
        //Watch if a command was added
        "$store.state.commands.commands": function (val) {
            this.sortFilter = 4;
            this.searchFilter = "";
            if (this.type == "collection") {
                this.getCommands();
            } else {
                this.commands = this.$store.state.commands.commands.data;
                this.paginationLinks = this.$store.state.commands.commands.links;
            }
        },
    },
};
</script>
<style lang="scss" scoped></style>
