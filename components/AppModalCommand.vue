<template>
    <!-- Modal -->
    <div class="modal fade" id="commandModal" tabindex="-1" aria-labelledby="commandModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="commandModalLabel" v-if="command">Update Command</h5>
                    <h5 class="modal-title" id="commandModalLabel" v-else>Add a new Command</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fal fa-times"></i></button>
                </div>
                <div class="modal-body">
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
                                <AppButton class="ml-4" v-if="!processing">
                                    <template v-if="command">Update Command</template>
                                    <template v-else>Add Command</template>
                                </AppButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from "bootstrap";
import AppValidationErrors from "~/components/AppValidationErrors.vue";
import AppButton from "~/components/AppButton.vue";
import AppInput from "~/components/AppInput.vue";
import AppLabel from "~/components/AppLabel.vue";
import AppLoader from "~/components/AppLoader.vue";
import AppMessage from "~/components/AppMessage.vue";
import global from "@/mixins/global.js";

export default {
    mounted() {
        this.modal = new Modal(document.getElementById(this.modalId));
    },
    components: {
        AppValidationErrors,
        AppButton,
        AppInput,
        AppLabel,
        AppLoader,
        AppMessage,
    },
    props: {
        command: {
            type: Object,
            required: false,
        },
        copyCommand: {
            type: Object,
            required: false,
        },
    },
    //Fetch user collections
    async fetch() {
        this.getCollections();
    },
    data() {
        return {
            modalId: "commandModal",
            form: {
                command: "",
                description: "",
                user_id: this.$auth?.user?.id ?? null,
                collection: "",
                copy_id: null,
                errors: [],
            },
            message: "",
            messageType: "",
            processing: false,
            userCollections: null,
        };
    },
    methods: {
        showModal() {
            this.modal.show();
            this.message = "";
            this.getCollections();
        },
        async getCollections() {
            try {
                await this.$store.dispatch("collections/fetchUserCollections", this.$store.state.auth.user.id);
                this.userCollections = this.$store.state.collections.userCollections;
            } catch (e) {}
        },
        //Add a New Command
        async submit() {
            this.processing = true;
            this.success = "";
            this.form.errors = [];

            try {
                //Update Command
                if (this.command?.id) {
                    await this.$store.dispatch("commands/updateUserCommand", { form: this.form, commandID: this.command.id });
                    //Re-fetch user collections in order to have an updated commands number in the side menu
                    await this.$store.dispatch("collections/fetchUserCollections", this.$store.state.auth.user.id);
                } else {
                    //Add new Command
                    await this.$store.dispatch("commands/addUserCommand", this.form);
                    //Re-fetch user collections in order to have an updated commands number in the side menu
                    await this.$store.dispatch("collections/fetchUserCollections", this.$store.state.auth.user.id);
                }
                this.processing = false;
                this.form.title = "";
                this.message = "Command was successfully added";
                this.messageType = "success";
            } catch (e) {
                this.processing = false;
                global.mapErrors(e, this.form.errors);
            }
        },
    },
    watch: {
        //If the command prop is updated(editing a command), reflect the changes on the form fields
        command: function (val) {
            if (val) {
                this.form.command = val.command;
                this.form.collection = val.collection_id;
                this.form.description = val.description;
            } else {
                this.form.command = "";
                this.form.collection = "";
                this.form.description = "";
            }
        },
        //If the copyCommand prop is updated(cloning a command), reflect the changes on the form fields
        copyCommand: function (val) {
            this.form.copy_id = val.id;
            this.form.command = val.command;
            this.form.description = val.description;
        },
    },
};
</script>
<style lang="scss" scoped></style>
