<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12" v-if="collection">
                        <h1>Update Collection {{ collection.title }}</h1>
                    </div>
                </div>
                <!--Modal-->
                <AppModal ref="messageModal" :modalMessage="modalMessage" />
                <!--Loader-->
                <AppLoader v-if="processing" />
                <!--Success-->
                <AppSuccess :message="success" />
                <!-- Validation Errors -->
                <AppValidationErrors :errors="form.errors" class="mb-4" />

                <form @submit.prevent="submit">
                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="title" value="Title" />
                            <AppInput id="title" type="title" class="mt-1 block w-full" v-model="form.title" autofocus autocomplete="username" />
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <AppButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"> Update Collection </AppButton>
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
import AppSuccess from "~/components/AppSuccess.vue";
import AppModal from "~/components/AppModal.vue";
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
        AppSuccess,
        AppModal,
    },
    middleware: "authenticated",
    data() {
        return {
            form: {
                title: this.$store.state.collections.collection.title,
                user_id: this.$auth.user.id,
                errors: [],
            },
            success: "",
            modalMessage: "",
            processing: false,
            collection: this.$store.state.collections.collection,
        };
    },
    //Get the current Collection
    async fetch({ store, params, error }) {
        try {
            await store.dispatch("collections/fetchUserCollection", { userID: store.state.auth.user.id, collectionID: params.id });
        } catch (e) {
            error({
                message: e,
            });
        }
    },
    methods: {
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
                this.success = "Collection updated successfully";
            } catch (e) {
                global.mapErrors(e, this.form.errors);
            }
        },
    },
};
</script>
