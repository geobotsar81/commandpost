<template>
    <main id="main">
        <slot></slot>
    </main>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
main {
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    padding: 40px 0px;
    color: $appWhite;
    min-height: 100vh;
    position: relative;
    text-align: left;
    background-color: $appBlack;
    background-image: url("~assets/img/square_pattern.png");

    :deep(ul, ol) {
        li {
            padding: 5px 0px;
        }
    }
}

@media (max-width: 575.98px) {
    main {
        text-align: center;
    }
}
</style>
