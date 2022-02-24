<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12"><h1>Login</h1></div>
                </div>

                <div class="card mt-5">
                    <div class="card-body">
                        <!-- Validation Errors -->
                        <BreezeValidationErrors v-if="form.errors" :errors="form.errors" class="mb-4" />

                        <form @submit.prevent="submit">
                            <div class="row">
                                <div class="col-12">
                                    <AppLabel for="email" value="Email" />
                                    <AppInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus autocomplete="username" />
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <AppLabel for="password" value="Password" />
                                    <AppInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autocomplete="current-password" />
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <label>
                                        <AppCheckbox name="remember" :checked="form.remember" />
                                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <NuxtLink to="/forgot-password"> Forgot your password? </NuxtLink>
                                    <AppLoader v-if="form.processing"></AppLoader>
                                    <AppButton class="ml-4" v-else> Log in </AppButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreezeValidationErrors from "@/components/validation-errors.vue";
import AppCheckbox from "~/components/AppCheckbox.vue";
import AppButton from "~/components/AppButton.vue";
import AppInput from "~/components/AppInput.vue";
import AppLabel from "~/components/AppLabel.vue";
import AppLoader from "~/components/AppLoader.vue";

export default {
    head: {
        title: "Login",
    },

    components: {
        BreezeValidationErrors,
        AppCheckbox,
        AppButton,
        AppInput,
        AppLabel,
        AppLoader,
    },

    data() {
        return {
            form: {
                email: "",
                password: "",
                remember: false,
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
                await this.$auth.loginWith("laravelSanctum", { data: this.form });

                this.processing = false;
            } catch (e) {
                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    Object.values(e.response.data.errors[key]).forEach((error) => {
                        this.form.errors.push(error);
                    });
                });
            }
        },
    },
};
</script>
