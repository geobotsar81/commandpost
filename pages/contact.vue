<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-2">
                <div class="row">
                    <div class="col-12"><h1>Contact the Commander!</h1></div>
                </div>

                <div class="card mt-5">
                    <div class="card-body">
                        <!-- Validation Errors -->
                        <AppValidationErrors v-if="form.errors" :errors="form.errors" class="mb-4" />
                        <!--Message-->
                        <AppMessage :message="message" :type="messageType" />

                        <form @submit.prevent="submit">
                            <input type="hidden" name="honeypot" v-model="form.honeypot" />

                            <div class="row mt-2">
                                <div class="col-12">
                                    <AppLabel for="password" value="Your Name" />
                                    <input id="name" type="name" class="mt-1 form-control" v-model="form.name" required />
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-12">
                                    <AppLabel for="email" value="Your Email" />
                                    <input id="email" type="email" class="mt-1 form-control" v-model="form.email" required />
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-12">
                                    <AppLabel for="email" value="Your Message" />
                                    <textarea id="message" type="message" class="mt-1 form-control" v-model="form.message" required />
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <AppLoader v-if="form.processing"></AppLoader>
                                    <AppButton class="ml-4" v-else> Submit </AppButton>
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
import AppTextarea from "~/components/AppTextarea.vue";
import AppLabel from "~/components/AppLabel.vue";
import AppLoader from "~/components/AppLoader.vue";
import ContactService from "~/services/ContactService.js";
import AppMessage from "~/components/AppMessage.vue";

export default {
    head: {
        title: "Contact us",
    },

    components: {
        AppValidationErrors,
        AppButton,
        AppInput,
        AppTextarea,
        AppLabel,
        AppLoader,
        AppMessage,
    },
    async fetch() {
        //Close mobile menu
        try {
            await this.$store.dispatch("theme/setMobileMenu", false);
        } catch (e) {}
    },
    data() {
        return {
            form: {
                email: "",
                name: "",
                message: "",
                honeypot: "",
                processing: false,
                errors: [],
            },
            message: "",
            messageType: "",
        };
    },

    methods: {
        async submit() {
            this.form.processing = true;
            this.form.errors = [];

            try {
                await ContactService.sendEmail(this.form);
                this.form.processing = false;
                this.message = "Message was successfully sent";
                this.messageType = "success";
                this.form.email = "";
                this.form.name = "";
                this.form.message = "";
            } catch (e) {
                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    Object.values(e.response.data.errors[key]).forEach((error) => {
                        this.form.errors.push(error);
                    });
                });
                this.form.processing = false;
            }
        },
    },
};
</script>
