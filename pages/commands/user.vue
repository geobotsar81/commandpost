<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Your Commands</h1></div>

            <!--Loader-->
            <AppLoader v-if="processing" />
            <!--Message-->
            <AppMessage :message="message" :type="messageType" />

            <div class="row mt-4">
                <div class="col-12"><NuxtLink class="btn btn-primary" to="/commands/add"> New Command </NuxtLink></div>
            </div>
            <div class="row mt-4" v-if="userCommands">
                <div class="col-12">
                    <ul>
                        <li class="mt-2" v-for="(command, index) in userCommands" :key="index">
                            <NuxtLink :to="'/commands/update/' + command.id">{{ command.command }}</NuxtLink>
                            |
                            <a href="#" @click.prevent="deleteCommand(command.id)">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppLoader from "~/components/AppLoader.vue";
import AppMessage from "~/components/AppMessage.vue";

export default {
    head: {
        title: "User Commands",
    },
    middleware: "authenticated",
    components: {
        AppLoader,
        AppMessage,
    },
    data() {
        return {
            form: {
                user_id: this.$auth.user.id,
            },
            userCommands: this.$store.state.commands.userCommands,
            processing: false,
            message: "",
            messageType: "",
        };
    },
    methods: {
        //Delete a Command
        async deleteCommand(commandID) {
            this.processing = true;
            this.message = "";

            try {
                await this.$store.dispatch("commands/deleteUserCommands", { form: this.form, commandID: commandID });
                this.processing = false;
                this.userCommands = this.$store.state.commands.userCommands;
                this.message = "Command deleted successfully";
                this.messageType = "success";
            } catch (e) {
                this.processing = false;
                this.message = e;
                this.messageType = "error";
            }
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
