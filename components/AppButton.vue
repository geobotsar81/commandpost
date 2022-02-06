<template>
    <button :type="type" class="btn btn-main">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "submit",
        },
    },
};
</script>
<style lang="scss" scoped>
.btn-main {
    font-size: 12px;
    background-color: $appBlack;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 4px;
    transition: $appTransition;

    &:hover,
    &:focus {
        background-color: $appGrey2;
        color: #fff;
    }
}
</style>
