<template>
    <textarea @input="handleInput" class="form-control" rows="4"></textarea>
</template>

<script>
export default {
    name: "BreezeInput",

    methods: {
        handleInput(e) {
            this.$emit("input", e.target.value);
        },
    },
};
</script>
