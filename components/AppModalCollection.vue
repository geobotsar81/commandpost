<template>
    <!-- Modal -->
    <div class="modal fade" id="collectionModal" tabindex="-1" aria-labelledby="collectionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="collectionModalLabel" v-if="collectionID">Update Collection</h5>
                    <h5 class="modal-title" id="collectionModalLabel" v-else>Add a new Collection</h5>
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
                                <AppLabel for="title" value="Title" />
                                <AppInput id="title" type="title" class="mt-1 block w-full" v-model="form.title" />
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-12">
                                <AppButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                    <template v-if="collectionID">Update Collection</template>
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
import AppValidationErrors from "@/components/validation-errors.vue";
import AppButton from "~/components/AppButton.vue";
import AppInput from "~/components/AppInput.vue";
import AppLabel from "~/components/AppLabel.vue";
import AppLoader from "~/components/AppLoader.vue";
import AppMessage from "~/components/AppMessage.vue";
import CollectionService from "@/services/CollectionService.js";
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
        collectionID: {
            type: Number,
            required: false,
        },
        collectionTitle: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            modalId: "collectionModal",
            form: {
                title: this.collectionTitle ?? null,
                user_id: this.$auth?.user?.id ?? null,
                collection_id: this.collectionID ?? null,
                errors: [],
            },
            message: "",
            messageType: "",
            processing: false,
        };
    },

    methods: {
        showModal() {
            this.modal.show();
        },
        //Add a New Collection
        async submit() {
            this.processing = true;
            this.success = "";
            this.form.errors = [];

            try {
                //Update Collection
                if (this.collectionID) {
                    await this.$store.dispatch("collections/updateUserCollection", { form: this.form, collectionID: this.collectionID });
                } else {
                    //Add new Collection
                    await this.$store.dispatch("collections/addUserCollection", { form: this.form });
                }
                this.$emit("refreshCollections");
                this.processing = false;
                this.form.title = "";
                this.message = "Collection was successfully added";
                this.messageType = "success";
            } catch (e) {
                this.processing = false;
                global.mapErrors(e, this.form.errors);
            }
        },
    },
    watch: {
        collectionTitle: function (val) {
            this.form.title = val;
        },
    },
};
</script>
<style lang="scss" scoped></style>
