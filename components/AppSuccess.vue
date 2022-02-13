<template>
    <div class="row" v-if="message">
        <div class="col-12">
            <div class="alert alert-success">{{ message }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
        },
    },
};
</script>
<style lang="scss" scoped></style>
