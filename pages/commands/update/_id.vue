<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12">
                        <h1>Update Command</h1>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <NuxtLink to="/commands/user"><i class="fas fa-long-arrow-left"></i> Back to my Commands </NuxtLink>
                    </div>
                </div>

                <!--Loader-->
                <AppLoader v-if="processing" />
                <!--Message-->
                <AppMessage :message="message" :type="messageType" />
                <!-- Validation Errors -->
                <AppValidationErrors :errors="form.errors" class="mb-4" />

                <form @submit.prevent="submit">
                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="collection" value="Collection" />
                            <select id="collection" class="form-select" aria-label="Default select example" v-model="form.collection">
                                <option value="" selected>Select a Collection</option>
                                <option v-for="(collection, index) in userCollections" :key="index" :value="collection.id">{{ collection.title }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="command" value="Command" />
                            <AppInput id="command" type="command" class="mt-1 block w-full" v-model="form.command" />
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="description" value="Description" />
                            <AppInput id="description" type="description" class="mt-1 block w-full" v-model="form.description" />
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <AppButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"> Update Command </AppButton>
                        </div>
                    </div>
                </form>
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
import AppModal from "~/components/AppModal.vue";
import global from "@/mixins/global.js";

export default {
    head: {
        title: "Update Command",
    },
    components: {
        AppValidationErrors,
        AppButton,
        AppInput,
        AppLabel,
        AppLoader,
        AppMessage,
        AppModal,
    },
    middleware: "authenticated",
    data() {
        return {
            form: {
                command: this.$store.state.commands.command.command,
                description: this.$store.state.commands.command.description,
                user_id: this.$auth.user.id,
                collection: this.$store.state.commands.command.collection_id,
                errors: [],
            },
            message: "",
            messageType: "",
            modalMessage: "",
            processing: false,
            command: this.$store.state.commands.command,
            userCollections: this.$store.state.collections.userCollections,
        };
    },
    //Fetch user collections and current Command
    async fetch({ store, params, error }) {
        try {
            await store.dispatch("collections/fetchUserCollections", store.state.auth.user.id);
            await store.dispatch("commands/fetchUserCommand", { userID: store.state.auth.user.id, commandID: params.id });
        } catch (e) {
            error({
                message: e,
            });
        }
    },
    methods: {
        //Update a new Command
        async submit() {
            //this.modalMessage = "Test";
            //this.$refs.messageModal.showModal();
            this.processing = true;
            this.success = "";
            this.form.errors = [];

            try {
                await this.$store.dispatch("commands/updateUserCommand", { form: this.form, commandID: this.command.id });
                this.processing = false;
                this.command = this.$store.state.commands.command;
                this.message = "Command updated successfully";
                this.messageType = "success";
            } catch (e) {
                this.processing = false;
                global.mapErrors(e, this.form.errors);
            }
        },
    },
};
</script>
