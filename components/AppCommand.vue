<template>
    <div>
        <!--Loader-->
        <AppLoader v-if="processing" />
        <div v-else class="command">
            <div class="row align-items-center">
                <div class="col-8">
                    <div class="row command__collection">
                        <div class="col-12">
                            <strong>{{ command.collection.title }}</strong>
                            <span v-if="command.description"> - {{ command.description }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 command__code">{{ command.command }}</div>
                    </div>
                </div>
                <div class="col-4 text-end command__links">
                    <NuxtLink :to="'/commands/clone/' + command.id"><i class="far fa-clone" title="copy"></i></NuxtLink>
                    <template v-if="command.collection.user_id == form.userID">
                        <NuxtLink :to="'/commands/update/' + command.id"><i class="far fa-edit" title="edot"></i></NuxtLink>
                        <a href="#" @click.prevent="deleteCommand(command.id)"><i class="far fa-trash-alt" title="delete"></i></a>
                    </template>
                </div>
            </div>
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
                userID: this.$auth?.user?.id,
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
<style lang="scss" scoped>
.command {
    padding: 15px 20px;
    border: solid 1px $appGrey;
    border-radius: $appBorderRadius;
    background-color: rgba($appBlack2, 0.5);
    margin-bottom: 20px;
    transition: $appTransition;

    &:hover,
    &:focus {
        background-color: rgba($appGrey2, 0.1);
    }
}

.command__collection {
    color: $appOrange;
    font-size: 12px;
    strong {
        font-size: 17px;
    }
}

.command__code {
    padding-top: 2px;
    font-style: italic;
    font-weight: 400;
}

.command__links {
    a {
        color: $appGreen;
        transition: $appTransition;
        margin: 0px 10px;

        &:hover,
        &:focus {
            color: $appOrange;
        }
    }
}
</style>
