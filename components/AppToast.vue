<template>
    <!-- Toast -->
    <div class="toast-container">
        <div :id="toastId" class="toast" data-bs-delay="2000" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <button @click.prevent="closeToast" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"><i class="fal fa-times"></i></button>
            </div>
            <div class="toast-body">{{ message }}</div>
        </div>
    </div>
</template>

<script>
import { Toast } from "bootstrap";

export default {
    mounted() {
        this.toast = new Toast(document.getElementById(this.toastId));
    },
    components: {},
    props: {
        message: {
            type: String,
        },
        toastId: {
            type: String,
        },
    },
    methods: {
        showToast() {
            this.toast.show();
        },
        closeToast() {
            this.toast.hide();
        },
    },
};
</script>
<style lang="scss" scoped>
.toast-container {
    position: fixed;
    right: 20px;
    top: 10px;
    z-index: $zindexToast;
}
.toast {
    background-color: $appOrange;
    color: $appBlack2;
    padding: 0px;
    box-shadow: $appBoxShadow;
    pointer-events: none;

    &.show {
        pointer-events: all;
    }
}
.toast-header {
    text-align: right;
    padding: 0px 5px 5px 5px;
    background-color: $appGrey;
    .btn-close {
        color: $appWhite;
        margin-left: auto;
        margin-right: 10px;
        font-size: 16px;
        width: 16px;
        height: 16px;
        background: none;
        &:hover,
        &:focus {
            box-shadow: none;
        }
    }
}
</style>
