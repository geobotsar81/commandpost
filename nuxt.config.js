export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "CommandPost",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    ssr: false,

    env: {
        backendUrl: "http://localhost:8001",
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["~/assets/scss/main.scss", "~/assets/fontawesome-pro/css/all.min.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: "~/plugins/bootstrap.js", mode: "client" }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        //"@nuxtjs/tailwindcss"
        "@nuxtjs/google-fonts",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        "@nuxtjs/style-resources",
        //"@nuxtjs/proxy",
    ],

    styleResources: {
        scss: ["./assets/scss/*.scss"],
    },

    googleFonts: {
        families: {
            Roboto: {
                wght: [400, 700, 900],
            },
        },
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: "http://localhost:8001",
        credentials: true,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    auth: {
        strategies: {
            laravelSanctum: {
                provider: "laravel/sanctum",
                url: "http://localhost:8001",
            },
        },
    },
};
