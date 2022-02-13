<template>
    <div class="row" v-if="error">
        <div class="col-12">
            <div class="alert alert-danger">{{ error }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: String,
        },
    },
};
</script>
<style lang="scss" scoped></style>
