<template>
    <div>
        <TheHeader />
        <TheMain>
            <Nuxt />
        </TheMain>
        <TheFooter />
    </div>
</template>

<script>
export default {
    middleware: "authenticated",
};
</script>
