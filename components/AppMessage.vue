<template>
    <div v-if="message">
        <div class="row" v-if="type == 'error'">
            <div class="col-12">
                <div class="alert alert-danger">{{ message }}</div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <div class="alert alert-success">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
};
</script>
