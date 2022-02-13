<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12"><h1>Add a new Collection</h1></div>
                </div>

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
                            <AppButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"> Add Collection </AppButton>
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
import CollectionService from "@/services/CollectionService.js";
import global from "@/mixins/global.js";

export default {
    head: {
        title: "Add a New Collection",
    },
    components: {
        AppValidationErrors,
        AppButton,
        AppInput,
        AppLabel,
        AppLoader,
        AppSuccess,
    },
    middleware: "authenticated",
    data() {
        return {
            form: {
                title: "",
                user_id: this.$auth.user.id,
                errors: [],
            },
            success: "",
            processing: false,
        };
    },

    methods: {
        //Add a New Collection
        async submit() {
            this.processing = true;
            this.success = "";
            this.form.errors = [];

            try {
                const response = await CollectionService.addCollection(this.form);
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
