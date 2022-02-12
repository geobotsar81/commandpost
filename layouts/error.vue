<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 v-if="error.statusCode === 404">Page not found</h1>
                <h1 v-else-if="error.statusCode === 403">Not authorised request</h1>
                <h1 v-else>{{ error.message }}</h1>
                Go back to <NuxtLink to="/">Home page</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["error"],
};
</script>
