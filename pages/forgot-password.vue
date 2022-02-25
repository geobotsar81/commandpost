<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12"><h1>Forgot Password</h1></div>
                </div>
                <div class="row mt-4">
                    <div class="col-12">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</div>
                </div>

                <div class="card mt-5">
                    <div class="card-body">
                        <!-- Validation Errors -->
                        <AppValidationErrors :errors="form.errors" class="mb-4" />

                        <form @submit.prevent="submit">
                            <div class="row">
                                <div class="col-12">
                                    <AppLabel for="email" value="Email" />
                                    <AppInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus autocomplete="username" />
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <AppButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing"> Email Password Reset Link </AppButton>
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
import AppValidationErrors from "~/components/AppValidationErrors.vue";
import AppButton from "~/components/AppButton.vue";
import AppInput from "~/components/AppInput.vue";
import AppLabel from "~/components/AppLabel.vue";
export default {
    head: {
        title: "Forgot Password",
    },

    components: {
        AppValidationErrors,
        AppButton,
        AppInput,
        AppLabel,
    },

    data() {
        return {
            form: {
                email: "",
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
                await this.$axios.post("/forgot-password", this.form);

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
