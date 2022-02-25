<template>
    <div>
        <!--Loader-->
        <AppLoader v-if="processing" />
        <div v-else class="command">
            <div class="row align-items-center">
                <!--Left Side-->
                <div class="col-sm-8 col-lg-9 text-center text-sm-start">
                    <div class="row command__collection">
                        <div class="col-12">
                            in <NuxtLink :to="'/collections/view/' + command.collection.id">{{ command.collection.title }}</NuxtLink>
                            <span v-if="command.description"> - {{ command.description }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="command__code">
                                <div class="icon"><i class="fas fa-code"></i></div>
                                <span>{{ command.command }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Right Side-->
                <div class="col-sm-4 col-lg-3 text-center text-sm-end">
                    <div class="row command__date d-none d-sm-block">
                        <div class="col-12">{{ command.formated_created }}</div>
                    </div>
                    <div class="row mt-2 command__links">
                        <div class="col-12">
                            <a href="#" @click.prevent="copyCommandText(command.command)"><i class="far fa-copy" title="copy to clipboard"></i></a>
                            <template v-if="auth.$state.loggedIn">
                                <a v-if="command.collection.user_id != form.userID" href="#" @click.prevent="copyCommand(command.id, command.collection.user_id)"
                                    ><i class="far fa-file-plus" title="add to collection"></i
                                ></a>
                                <template v-if="command.collection.user_id == form.userID">
                                    <a href="#" @click.prevent="editCommand(command.id)"><i class="far fa-edit" title="edit"></i></a>
                                    <a href="#" @click.prevent="deleteCommand(command.id)"><i class="far fa-trash-alt" title="delete"></i></a>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppLoader from "~/components/AppLoader.vue";
import AppToast from "~/components/AppToast.vue";

export default {
    components: {
        AppLoader,
        AppToast,
    },
    props: {
        command: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            form: {
                userID: this.$auth?.user?.id ?? null,
            },
            auth: this.$auth ?? null,
            processing: false,
        };
    },
    methods: {
        //Copy Command
        async copyCommand(commandID, userID) {
            await this.$store.dispatch("commands/copyUserCommand", { userID: userID, commandID: commandID });
        },
        //Edit Command
        async editCommand(commandID) {
            await this.$store.dispatch("commands/fetchUserCommand", { userID: this.form.userID, commandID: commandID });
        },
        //Delete a Command
        async deleteCommand(commandID) {
            this.processing = true;
            this.message = "";

            try {
                await this.$store.dispatch("commands/deleteUserCommands", { form: this.form, commandID: commandID });
                this.processing = false;
                this.$emit("showToast", "Command deleted successfully");
            } catch (e) {
                this.processing = false;
                this.$emit("showToast", e);
            }
        },
        //Copy command text
        copyCommandText(command) {
            navigator.clipboard.writeText(command);
            this.$emit("showToast", "Command copied to clipboard");
        },
    },
    watch: {
        "$store.state.auth.user": function (val) {
            this.form.userID = this.$auth?.user?.id ?? null;
        },
    },
};
</script>
