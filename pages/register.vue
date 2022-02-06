<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12"><h1>Register</h1></div>
                </div>
                <!-- Validation Errors -->
                <BreezeValidationErrors :errors="form.errors" class="mb-4" />

                <form @submit.prevent="submit">
                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="name" value="Name" />
                            <AppInput id="name" type="text" class="input mt-1 block w-full" v-model="form.name" required autofocus autocomplete="name" />
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="email" value="Email" />
                            <AppInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autocomplete="username" />
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="password" value="Password" />
                            <AppInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autocomplete="new-password" />
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <AppLabel for="password_confirmation" value="Confirm Password" />
                            <AppInput id="password_confirmation" type="password" class="mt-1 block w-full" v-model="form.password_confirmation" required autocomplete="new-password" />
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <NuxtLink to="/login" class="underline text-sm text-gray-600 hover:text-gray-900"> Already registered? </NuxtLink>

                            <AppButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"> Register </AppButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import BreezeValidationErrors from "@/components/validation-errors.vue";
import AppButton from "~/components/AppButton.vue";
import AppInput from "~/components/AppInput.vue";
import AppLabel from "~/components/AppLabel.vue";
export default {
    head: {
        title: "Register",
    },

    components: {
        BreezeValidationErrors,
        AppButton,
        AppInput,
        AppLabel,
    },

    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                terms: false,
                processing: false,
                errors: [],
            },
        };
    },

    methods: {
        async submit() {
            this.processing = true;
            this.form.errors = [];

            try {
                await this.$axios.post("register", this.form);

                await this.$auth.loginWith("laravelSanctum", { data: this.form });

                this.processing = false;
            } catch (e) {
                Object.keys(e.response.data.errors).forEach((key) => {
                    Object.values(e.response.data.errors[key]).forEach((error) => {
                        this.form.errors.push(error);
                    });
                });
            }
        },
    },
};
</script>
