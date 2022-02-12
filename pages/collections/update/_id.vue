<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12" v-if="collection">
                        <h1>Update Collection {{ collection.title }}</h1>
                    </div>
                </div>

                <!-- Validation Errors -->
                <AppValidationErrors :errors="form.errors" class="mb-4" />

                <div class="row" v-if="success">
                    <div class="col-12">
                        <div class="alert alert-success">{{ success }}</div>
                    </div>
                </div>

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
import CollectionService from "@/services/CollectionService.js";
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
    },
    middleware: "authenticated",
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
    data() {
        return {
            form: {
                title: this.$store.state.collections.collection.title,
                user_id: this.$auth.user.id,
                collection_id: this.$store.state.collections.collection.id,
                errors: [],
            },
            success: "",
            collection: this.$store.state.collections.collection,
        };
    },
    methods: {
        //Update a new Collection
        async submit() {
            this.processing = true;
            this.success = "";
            this.form.errors = [];

            try {
                const response = await CollectionService.updateCollection(this.form);
                this.processing = false;
                this.form.title = "";
                this.success = response.data;
            } catch (e) {
                global.mapErrors(e, this.form.errors);
            }
        },
    },
};
</script>
