<template>
    <input type="text" @input="handleInput" class="form-control" />
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
