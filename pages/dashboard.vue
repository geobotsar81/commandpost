<template>
    <div class="container">
        <div class="row">
            <div class="col-12"><h1>Your Dashboard</h1></div>

            <div class="row mt-4">
                <div class="col-12"><NuxtLink to="/collections/user"> My Collections </NuxtLink></div>
            </div>

            <div class="row mt-2">
                <div class="col-12"><NuxtLink to="/collections/add"> New Collection </NuxtLink></div>
            </div>

            <div class="row">
                <div class="col-12"><hr /></div>
            </div>

            <div class="row mt-4">
                <div class="col-12"><NuxtLink to="/commands/user"> My Commands </NuxtLink></div>
            </div>

            <div class="row mt-2">
                <div class="col-12"><NuxtLink to="/commands/add"> New Command </NuxtLink></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head: {
        title: "Dashboard",
    },
    middleware: "authenticated",
};
</script>
