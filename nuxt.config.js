export default {
    target: "static",
    mode: "universal",
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "CommandPost",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "A place for web devs to store their commands" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicons/favicon.ico" },
            { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png" },
            { rel: "icon", sizes: "32x32", href: "/favicons/favicon-32x32.png" },
            { rel: "icon", sizes: "16x16", href: "/favicons/favicon-16x16.png" },
            { rel: "manifest", href: "/favicons/site.webmanifest" },
        ],
    },

    ssr: false,

    env: {
        backendUrl: process.env.NODE_ENV === "dev" ? "http://localhost:8001" : "https://api.commandpost.dev",
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["~/assets/scss/theme1/main.scss", "~/assets/fontawesome-pro/css/all.min.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: "~/plugins/bootstrap.js" }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ["@nuxtjs/google-fonts"],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        "@nuxtjs/style-resources",
        //"@nuxtjs/proxy",
    ],

    styleResources: {
        scss: ["./assets/scss/theme1/main.scss"],
    },

    googleFonts: {
        families: {
            Roboto: {
                wght: [400, 700, 900],
                ital: [400],
            },
        },
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.BASE_URL,
        credentials: true,
        //proxy: true,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    /*proxy: {
        "/api/": {
            target: "http://localhost:8001",
            pathRewrite: { "^/api/": "" },
        },
    },*/
    auth: {
        redirect: {
            login: "/login",
            logout: "/",
            callback: "/login",
            home: "/",
        },
        strategies: {
            laravelSanctum: {
                provider: "laravel/sanctum",
                url: process.env.BASE_URL,
            },
            cookie: {
                /*cookie: {
                    // (optional) If set, we check this cookie existence for loggedIn check
                    name: "XSRF-TOKEN",
                },*/
                /*endpoints: {
                    // (optional) If set, we send a get request to this endpoint before login
                    csrf: {
                        url: "/sanctum/csrf-cookie",
                    },
                },*/
            },
        },
    },
};
