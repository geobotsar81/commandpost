<template>
    <div class="container-fluid siteContainer">
        <div class="row">
            <div class="col-md-4 col-lg-3 pe-0 ps-0"><TheSideMenu /></div>
            <div class="col-md-8 col-lg-9 pe-0 ps-0">
                <TheMain>
                    <Nuxt />
                </TheMain>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.siteContainer {
    padding: 0px;
    overflow: hidden;
}
</style>
