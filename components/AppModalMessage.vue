<template>
    <!-- Modal -->
    <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="messageModalLabel">
                        <span v-if="type == 'error'"><i class="far fa-exclamation-triangle"></i> Error</span>
                        <span v-if="type == 'success'"><i class="far fa-check-circle"></i> Success</span>
                    </h5>
                    <button @click.prevent="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fal fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div :class="type == 'error' ? 'alert alert-danger' : 'alert alert-success'">{{ message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
    mounted() {
        this.modal = new Modal(document.getElementById(this.modalId));
    },
    components: {},
    data() {
        return {
            modalId: "messageModal",
        };
    },
    props: {
        message: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    methods: {
        showModal() {
            this.modal.show();
        },
        closeModal() {
            this.modal.hide();
        },
    },
};
</script>
<style lang="scss" scoped></style>
