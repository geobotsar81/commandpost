<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12" v-if="collection">
                        <h1>Commands in Collection {{ collection.title }}</h1>
                    </div>
                </div>

                <div class="row mt-4 mb-2">
                    <div class="col-12">
                        <NuxtLink to="/collections/user"><i class="fas fa-long-arrow-left"></i> Back to my Collections </NuxtLink>
                    </div>
                </div>

                <!--Loader-->
                <AppLoader v-if="processing" />
                <!--Message-->
                <AppMessage :message="message" :type="messageType" />

                <div class="row mt-4" v-if="collectionCommands">
                    <div class="col-12">
                        <ul>
                            <li class="mt-2" v-for="(command, index) in collectionCommands" :key="index">
                                <AppCommand @showMessage="displayMessage" @deletedCommand="refreshCommands" :command="command" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppValidationErrors from "@/components/validation-errors.vue";
import AppButton from "~/components/AppButton.vue";
import AppInput from "~/components/AppInput.vue";
import AppLabel from "~/components/AppLabel.vue";
import AppLoader from "~/components/AppLoader.vue";
import AppMessage from "~/components/AppMessage.vue";
import AppCommand from "~/components/AppCommand.vue";
import global from "@/mixins/global.js";

export default {
    head: {
        title: "Update Collection",
    },
    components: {
        AppValidationErrors,
        AppButton,
        AppInput,
        AppLabel,
        AppLoader,
        AppMessage,
        AppCommand,
    },
    middleware: "authenticated",
    data() {
        return {
            processing: false,
            message: "",
            messageType: "",
            collection: this.$store.state.collections.collection,
            collectionCommands: this.$store.state.commands.collectionCommands,
        };
    },
    //Get the current Collection along with its Commands
    async fetch({ store, params, error }) {
        try {
            await store.dispatch("collections/fetchUserCollection", { userID: store.state.auth.user.id, collectionID: params.id });
            await store.dispatch("commands/fetchCollectionCommands", { userID: store.state.auth.user.id, collectionID: params.id });
        } catch (e) {
            error({
                message: e,
            });
        }
    },
    methods: {
        async refreshCommands() {
            await this.$store.dispatch("commands/fetchCollectionCommands", { userID: this.$store.state.auth.user.id, collectionID: this.collection.id });
            this.collectionCommands = this.$store.state.commands.collectionCommands;
        },
        displayMessage(message) {
            this.message = message.message;
            this.messageType = message.type;
        },
        //Update a new Collection
        async submit() {
            //this.modalMessage = "Test";
            //this.$refs.messageModal.showModal();
            this.processing = true;
            this.success = "";
            this.form.errors = [];

            try {
                await this.$store.dispatch("collections/updateUserCollection", { form: this.form, collectionID: this.collection.id });
                this.processing = false;
                this.collection = this.$store.state.collections.collection;
                this.message = "Collection updated successfully";
                this.messageType = "success";
            } catch (e) {
                this.processing = false;
                global.mapErrors(e, this.form.errors);
            }
        },
    },
};
</script>
