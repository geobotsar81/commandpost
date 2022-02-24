<template>
    <div class="row">
        <div class="col-12"><div class="lds-hourglass"></div></div>
    </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.lds-hourglass {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
}
.lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 4px;
    box-sizing: border-box;
    border: 10px solid $appOrange;
    border-color: $appOrange transparent $appOrange transparent;
    animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
}
</style>
