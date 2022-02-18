<template>
    <div>
        <!--Message-->
        <AppMessage :message="message" :type="messageType" />

        <div class="row mt-4" v-if="commands">
            <div class="col-12">
                <div class="row" v-for="(command, index) in commands" :key="index">
                    <div class="col-12">
                        <AppCommand @showMessage="displayMessage" @deletedCommand="refreshCommands" :command="command" />
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12"><AppPagination :currentPage="currentPage" :links="paginationLinks" v-model="currentPage" /></div>
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
        };
    },
    methods: {
        refreshCommands() {
            this.userCommands = this.$store.state.commands.userCommands;
        },
        displayMessage(message) {
            this.message = message.message;
            this.messageType = message.type;
        },
    },
};
</script>
<style lang="scss" scoped></style>
