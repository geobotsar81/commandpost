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
                    <div class="row align-items-center">
                        <div class="col-sm-1 command__symbol d-none d-sm-flex"><i class="fas fa-code"></i></div>
                        <div class="col-sm-11 command__code">
                            {{ command.command }}
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
    a {
        font-size: 17px;
        font-weight: 700;

        &:hover,
        &:focus {
            color: $appOrange2;
        }
    }
}
.command__symbol {
    i {
        color: $appGrey;
        font-size: 14px;
    }
}
.command__code {
    padding-top: 2px;
    font-style: italic;
    font-weight: 400;
    font-size: 18px;

    .copy {
        color: $appOrange;
        font-size: 16px;
        padding-left: 20px;
        cursor: pointer;

        &:hover,
        &:focus {
            color: $appOrange2;
        }
    }
}
.command__date {
    font-size: 11px;
    color: $appGrey2;
}
.command__links {
    a {
        color: $appGreen;
        font-size: 18px;
        transition: $appTransition;
        margin-left: 15px;

        &:hover,
        &:focus {
            color: $appOrange;
        }
    }
}
</style>
