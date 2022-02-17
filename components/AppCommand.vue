<template>
    <div>
        <!--Loader-->
        <AppLoader v-if="processing" />
        <div v-else>
            {{ command.command }}
            <span class="float-end">
                <NuxtLink :to="'/commands/update/' + command.id">Edit</NuxtLink> |
                <a href="#" @click.prevent="deleteCommand(command.id)">Delete</a>
            </span>
        </div>
    </div>
</template>

<script>
import AppLoader from "~/components/AppLoader.vue";
export default {
    components: {
        AppLoader,
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
                userID: this.$auth.user.id,
            },
            processing: false,
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
                this.$emit("deletedCommand", true);
                this.$emit("showMessage", { message: "Command deleted successfully", type: "success" });
            } catch (e) {
                this.processing = false;
                this.$emit("showMessage", { message: e, type: "error" });
            }
        },
    },
};
</script>
<style lang="scss" scoped></style>
