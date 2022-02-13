<template>
    <!-- Modal -->
    <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="messageModalLabel">Error</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">{{ modalMessage }}</div>
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
    props: {
        modalMessage: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            modalId: "messageModal",
        };
    },
    methods: {
        showModal() {
            this.modal.show();
        },
    },
};
</script>
<style lang="scss" scoped></style>
