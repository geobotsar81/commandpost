<template>
    <div class="sideMenu" :class="showMobileMenu ? 'expanded' : ''">
        <div class="row">
            <div class="col-6 col-md-12">
                <NuxtLink to="/">
                    <AppLogo />
                </NuxtLink>
            </div>
            <div class="col-6 col-md-12 text-end d-md-none">
                <div class="sideMenu__burger"><i @click="toggleMobileMenu" :class="showMobileMenu ? 'far fa-times' : 'far fa-bars'"></i></div>
            </div>
        </div>

        <!--Toast for message-->
        <AppToast ref="messageToast" :message="message" toastId="sidemenuToast" />
        <!--Collection Modal-->
        <AppCollectionModal :collection="editCollection" ref="collectionModal" />
        <!--Command Modal-->
        <AppCommandModal :command="editCommand" :copyCommand="copyCommand" ref="commandModal" />

        <div class="row mt-4 sideMenu__links">
            <div class="col-8 offset-2 col-sm-6 offset-sm-3 offset-md-0 col-md-12">
                <ul>
                    <li><NuxtLink to="/"> Home </NuxtLink></li>
                    <template v-if="auth.$state.loggedIn">
                        <li v-if="userCollections">
                            <a class="collapseToggle" data-bs-toggle="collapse" href="#collapseCollections" role="button" aria-expanded="false" aria-controls="collapseCollections"
                                >My Collections <i class="fal fa-angle-down"></i
                            ></a>

                            <div class="collapse" id="collapseCollections">
                                <div>
                                    <ul>
                                        <li class="mt-2" v-for="(collection, index) in userCollections" :key="index">
                                            <AppCollection @showToast="showToast" type="compact" :collection="collection" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li><a href="#" @click.prevent="logout">Logout</a></li>
                        <li>
                            <a class="btn btn-primary" href="#" @click.prevent="showCollectionModal"> <i class="fas fa-plus-circle"></i> Add Collection </a>
                        </li>
                        <li>
                            <a class="btn btn-secondary" href="#" @click.prevent="showCommandModal"> <i class="fas fa-plus-circle"></i> Add Command </a>
                        </li>
                    </template>

                    <template v-else>
                        <li><NuxtLink to="/login"> Log in </NuxtLink></li>
                        <li><NuxtLink to="/register"> Register </NuxtLink></li>
                    </template>
                </ul>
            </div>
        </div>

        <div class="sidemenu__copyrights">©CmndPost {{ currentYear }} - All rights reserved</div>
    </div>
</template>
<script>
import AppLogo from "~/components/AppLogo.vue";
import AppCollection from "~/components/AppCollection.vue";
import AppCollectionModal from "~/components/AppModalCollection.vue";
import AppCommandModal from "~/components/AppModalCommand.vue";
import AppMessageModal from "~/components/AppModalMessage.vue";

export default {
    components: {
        AppLogo,
        AppCollection,
        AppCollectionModal,
        AppMessageModal,
        AppCommandModal,
    },
    data() {
        return {
            userCollections: null,
            auth: this.$auth ?? null,
            message: null,
            type: null,
            editCollection: null,
            editCommand: null,
            copyCommand: null,
            showMobileMenu: false,
        };
    },
    //Fetch user collections
    fetch() {
        this.getCollections();
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
        //Get the user's collections
        async getCollections() {
            try {
                await this.$store.dispatch("collections/fetchUserCollections", this.$store.state.auth.user.id);
                this.userCollections = this.$store.state.collections.userCollections;
            } catch (e) {}
        },
        //Show the modal to add/edit a Collection
        showCollectionModal() {
            this.editCollection = null;
            this.$refs.collectionModal.showModal();
        },
        //Show the modal to add/edit a Command
        showCommandModal() {
            this.editCommand = null;
            this.$refs.commandModal.showModal();
        },
        //Show a message as toash
        showToast(message) {
            this.message = message;
            this.$refs.messageToast.showToast();
        },
        //Toggle Mobile menu
        toggleMobileMenu() {
            this.showMobileMenu = !this.showMobileMenu;
            console.log(this.showMobileMenu);
        },
    },
    watch: {
        //Watch if user has logged in
        "$store.state.auth.user": function (val) {
            this.auth = this.$auth;
            this.getCollections();
        },
        //Watch if there was a change in user's collections
        "$store.state.collections.userCollections": function (val) {
            this.userCollections = this.$store.state.collections.userCollections;
        },
        //Watch if there was a change in user's commands
        "$store.state.commands.commands": function (val) {
            this.userCollections = this.$store.state.collections.userCollections;
        },
        //Watch if a command is being edited and launch the modal
        "$store.state.commands.command": function (val) {
            this.editCommand = val;
            this.$refs.commandModal.showModal();
        },
        //Watch if a command is being cloned and launch the modal
        "$store.state.commands.copiedCommand": function (val) {
            this.copyCommand = val;
            this.$refs.commandModal.showModal();
        },
        //Watch if a collection is being edited and launch the modal
        "$store.state.collections.collection": function (val) {
            this.editCollection = val;
            this.$refs.collectionModal.showModal();
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
    transition: $appTransition;
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

    a:not(.btn),
    button {
        color: $appOrange;
        font-size: 18px;

        &:hover,
        &:focus {
            color: $appOrange2;
        }
    }

    i {
        transition: $appTransition;
    }

    a[aria-expanded="true"] {
        i {
            transform: rotate(180deg);
        }
    }
}

.sideMenu__burger {
    font-size: 24px;
    color: $appOrange;
    padding-top: 5px;
    i {
        cursor: pointer;
    }
}

.sidemenu__copyrights {
    position: absolute;
    left: 0px;
    bottom: 15px;
    color: $appGrey2;
    width: 100%;
    padding: 0px 15px;
    text-align: center;
}

@media (max-width: 1199.98px) {
    .sideMenu {
        padding: 15px 25px;
    }
    :deep(.logo) {
        font-size: 25px !important;
    }
}

@media (max-width: 767.98px) {
    .sideMenu {
        height: 60px;
        padding: 10px 30px;
        margin: 0px;
        overflow: hidden;
        .sideMenu__links,
        .sidemenu__copyrights {
            opacity: 0;
            transition: $appTransition;
            text-align: center;
        }
        &.expanded {
            height: 100vh;

            .sideMenu__links {
                opacity: 1;
                transition: $appTransition;
            }
            .sidemenu__copyrights {
                opacity: 1;
                transition: $appTransition;
            }
        }
        .sidemenu__copyrights {
            pointer-events: none;
        }
    }
}
</style>
