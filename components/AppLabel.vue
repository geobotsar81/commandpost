<template>
    <label class="form-label">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot /></span>
    </label>
</template>

<script>
export default {
    name: "BreezeLabel",

    props: ["value"],
};
</script>
