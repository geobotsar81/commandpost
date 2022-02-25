<template>
    <div v-if="links.length > 3">
        <div class="row mt-4">
            <div class="col-12">
                <nav aria-label="navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="link.label == pageNumber ? 'active' : ''" v-for="(link, key) in links" :key="key">
                            <div v-if="link.url === null" class="page-link" v-html="printLabel(link.label)" />
                            <a href="#" v-else class="page-link" @click.prevent="selectPage(link.label)" v-html="printLabel(link.label)" preserve-scroll />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        links: Array,
        currentPage: Number,
    },
    data() {
        return {
            pageNumber: this.currentPage,
        };
    },
    methods: {
        printLabel(label) {
            label = label.replace("Next", "");
            label = label.replace("Previous", "");
            return label;
        },
        selectPage(key) {
            //alert(key);
            if (key == "Next &raquo;") {
                key = this.pageNumber + 1;
            }
            if (key == "&laquo; Previous") {
                key = this.pageNumber - 1;
            }
            let currentPageNumber = parseInt(key);
            this.$emit("changePage", currentPageNumber);
            this.pageNumber = currentPageNumber;
        },
    },
};
</script>
<style lang="scss" scoped></style>
