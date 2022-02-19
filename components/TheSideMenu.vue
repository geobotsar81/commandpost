<template>
    <div class="sideMenu">
        <div class="row">
            <div class="col-12">
                <NuxtLink to="/">
                    <AppLogo />
                </NuxtLink>
            </div>
        </div>
        <p v-if="$fetchState.pending">{{ $fetchState }}Fetching mountains...</p>
        <div class="row mt-4 sideMenu__links">
            <div class="col-12">
                <ul>
                    <li><NuxtLink to="/"> Home </NuxtLink></li>
                    <template v-if="$auth.loggedIn">
                        <li><NuxtLink to="/dashboard"> Dashboard </NuxtLink></li>
                        <li>
                            <a data-bs-toggle="collapse" href="#collapseCollections" role="button" aria-expanded="false" aria-controls="collapseCollections"
                                >Collections <i class="fal fa-angle-up"></i
                            ></a>

                            <div class="collapse" id="collapseCollections">
                                <div>
                                    <ul>
                                        <li class="mt-2" v-for="(collection, index) in userCollections" :key="index">
                                            <AppCollection type="compact" :collection="collection" />
                                        </li>
                                        <li class="mt-4">
                                            <NuxtLink to="/collections/add"> <i class="fas fa-plus-circle"></i> Add Collection </NuxtLink>
                                        </li>
                                        <li class="mt-2">
                                            <NuxtLink to="/commands/add"> <i class="fas fa-plus-circle"></i> Add Command </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li><a href="#" @click.prevent="logout">Logout</a></li>
                    </template>

                    <template v-else>
                        <li><NuxtLink to="/login"> Log in </NuxtLink></li>
                        <li><NuxtLink to="/register"> Register </NuxtLink></li>
                    </template>
                </ul>
            </div>
        </div>

        <div class="sidemenu__copyrights">© All rights reserved - {{ currentYear }}</div>
    </div>
</template>
<script>
import AppLogo from "~/components/AppLogo.vue";
import AppCollection from "~/components/AppCollection.vue";

export default {
    components: {
        AppLogo,
        AppCollection,
    },
    data() {
        return {
            userCollections: null,
        };
    },
    //Fetch user collections
    async fetch() {
        try {
            await this.$store.dispatch("collections/fetchUserCollections", this.$store.state.auth.user.id);
            this.userCollections = this.$store.state.collections.userCollections;
        } catch (e) {}
    },
    computed: {
        currentYear() {
            const d = new Date();
            let year = d.getFullYear();
            return year;
        },
    },
    methods: {
        logout() {
            this.$auth.logout();
        },
    },
};
</script>

<style lang="scss" scoped>
.sideMenu {
    padding: 15px 45px;
    background-color: rgba($appBlack2, 1);
    height: 100%;
    display: inline-block;
    position: relative;
    width: 100%;
}

.sideMenu__links {
    ul {
        padding-left: 0px;
    }

    li {
        list-style: none;
        padding: 10px 0px;

        ul {
            padding-left: 10px;
            li {
                padding: 2px 0px;
            }
        }
    }

    a,
    button {
        color: $appOrange;
        font-size: 18px;
    }

    i {
        transition: $appTransition;
    }

    a.collapsed {
        i {
            transform: rotate(180deg);
        }
    }
}

.sidemenu__copyrights {
    position: absolute;
    left: 45px;
    bottom: 15px;
    color: $appGrey2;
}

@media (max-width: 1199.98px) {
    .sideMenu {
        padding: 15px 25px;
    }
    :deep(.logo) {
        font-size: 25px !important;
    }
}
</style>
