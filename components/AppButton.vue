<template>
    <button :type="type" class="btn btn-primary">
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
<style lang="scss" scoped></style>
