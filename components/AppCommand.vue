<template>
    <div>
        <!--Loader-->
        <AppLoader v-if="processing" />
        <div v-else class="command">
            <div class="row align-items-center">
                <!--Left Side-->
                <div class="col-sm-8 text-center text-sm-start">
                    <div class="row command__collection">
                        <div class="col-12">
                            <strong>{{ command.collection.title }}</strong>
                            <span v-if="command.description"> - {{ command.description }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 command__code">
                            <i class="fas fa-code"></i> {{ command.command }}
                            <i @click="copyCommandText(command.command)" class="copy fas fa-copy" title="copy text"></i>
                        </div>
                    </div>
                </div>
                <!--Right Side-->
                <div class="col-sm-4 text-center text-sm-end">
                    <div class="row command__date d-none d-sm-block">
                        <div class="col-12">{{ command.formated_created }}</div>
                    </div>
                    <div class="row mt-2 command__links">
                        <div class="col-12">
                            <NuxtLink :to="'/commands/clone/' + command.id"><i class="far fa-clone" title="duplicate command"></i></NuxtLink>
                            <template v-if="command.collection.user_id == form.userID">
                                <NuxtLink :to="'/commands/update/' + command.id"><i class="far fa-edit" title="edit"></i></NuxtLink>
                                <a href="#" @click.prevent="deleteCommand(command.id)"><i class="far fa-trash-alt" title="delete"></i></a>
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
                this.$emit("showToast", "Command deleted successfully");
            } catch (e) {
                this.processing = false;
                this.$emit("showToast", e);
            }
        },
        //Copy command text
        copyCommandText(command) {
            navigator.clipboard.writeText(command);
            this.$emit("showToast", "Command copied to keyboard");
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
    strong {
        font-size: 17px;
    }
}

.command__code {
    padding-top: 2px;
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    i {
        color: $appGrey;
        font-size: 14px;
        padding-right: 10px;
    }
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
        transition: $appTransition;
        margin-left: 20px;

        &:hover,
        &:focus {
            color: $appOrange;
        }
    }
}
</style>
