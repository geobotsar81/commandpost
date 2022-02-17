<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Your Commands</h1></div>

            <!--Message-->
            <AppMessage :message="message" :type="messageType" />

            <div class="row mt-4">
                <div class="col-12"><NuxtLink class="btn btn-primary" to="/commands/add"> New Command </NuxtLink></div>
            </div>
            <div class="row mt-4" v-if="userCommands">
                <div class="col-12">
                    <ul>
                        <li class="mt-2" v-for="(command, index) in userCommands" :key="index">
                            <AppCommand @showMessage="displayMessage" @deletedCommand="refreshCommands" :command="command" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppMessage from "~/components/AppMessage.vue";
import AppCommand from "~/components/AppCommand.vue";

export default {
    head: {
        title: "User Commands",
    },
    middleware: "authenticated",
    components: {
        AppMessage,
        AppCommand,
    },
    data() {
        return {
            userCommands: this.$store.state.commands.userCommands,
            message: "",
            messageType: "",
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
    //Fetch user commands
    async fetch({ store, error }) {
        try {
            await store.dispatch("commands/fetchUserCommands", store.state.auth.user.id);
        } catch (e) {
            error({
                message: e,
            });
        }
    },
};
</script>
