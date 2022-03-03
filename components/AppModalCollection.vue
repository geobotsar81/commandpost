<template>
    <!-- Modal -->
    <div class="modal fade" id="collectionModal" tabindex="-1" aria-labelledby="collectionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="collectionModalLabel" v-if="collection">Update Collection</h5>
                    <h5 class="modal-title" id="collectionModalLabel" v-else>Add a new Collection</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="far fa-times"></i></button>
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
                                <AppLabel for="title" value="Title" />
                                <AppInput id="title" type="title" class="mt-1 block w-full" v-model="form.title" />
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-12">
                                <AppButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                    <template v-if="collection">Update Collection</template>
                                    <template v-else>Add Collection</template>
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
        collection: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            modalId: "collectionModal",
            form: {
                title: "",
                user_id: this.$auth?.user?.id ?? null,
                collection_id: null,
                errors: [],
            },
            message: "",
            messageType: "",
            processing: false,
        };
    },

    methods: {
        showModal() {
            this.form.title = "";
            this.form.user_id = this.$auth?.user?.id ?? null;
            this.modal.show();
            this.message = "";
        },
        //Add a New Collection
        async submit() {
            this.processing = true;
            this.success = "";
            this.form.errors = [];

            try {
                //Update Collection
                if (this.collection) {
                    await this.$store.dispatch("collections/updateUserCollection", { form: this.form, collectionID: this.collection.id });
                    this.message = "Collection was successfully updated";
                } else {
                    //Add new Collection
                    await this.$store.dispatch("collections/addUserCollection", { form: this.form });
                    this.form.title = "";
                    this.message = "Collection was successfully added";
                }
                this.processing = false;
            } catch (e) {
                this.processing = false;
                global.mapErrors(e, this.form.errors);
            }
        },
    },
    watch: {
        //If the collection prop is updated(editing a collection), reflect the changes on the form fields
        collection: function (val) {
            console.log("watch");
            if (val) {
                this.form.title = val?.title;
            } else {
                this.form.title = "";
            }
        },
    },
};
</script>
<style lang="scss" scoped></style>
