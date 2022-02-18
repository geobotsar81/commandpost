<template>
    <div class="logo">CmndPost</div>
</template>
<script>
export default {
    name: "AppLogo",
};
</script>
<style lang="scss" scoped>
.logo {
    font-size: 48px;
    color: $appGrey2;
    font-weight: 900;
    text-decoration: none;
}
@media (max-width: 1199.98px) {
    .logo {
        font-size: 40px !important;
    }
}
</style>
