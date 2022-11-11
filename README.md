# MEDIA CLIENT

Client that sits on the Media Service and Media Database. Uses Vue3, Vite, Pinia, Vuetify 3 beta, TS and Auth0

## Quickstart
* First setup Auth0 by going to [the dashboard](https://manage.auth0.com/dashboard/) and configure your SPA app authorization. update values in `.env` to match
    - [see here](https://developer.auth0.com/resources/guides/spa/vue/basic-authentication) for more info about Auth0
    - sample `.env` file:
        ```
        VITE_API_SERVER_URL=YOUR_SERVER_URL
        VITE_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
        VITE_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
        VITE_AUTH0_AUDIENCE=YOUR_AUTH0_AUDIENCE
        VITE_AUTH0_CALLBACK_URL=YOUR_APP_URL/callback
        ```

* then you can get building:
```sh
# Project setup
npm i

# build and hot-load
npm run dev

# compile and Minify for Production
npm run build

# lint
npm run lint
```

## Notes
* [Typescript and Vue3](https://vuejs.org/guide/typescript/overview.html)
* [more in depth TS info here](https://blog.logrocket.com/how-to-use-vue-3-typescript/)
* [how to transition from vue-class-components to the CompositionAPI](https://levelup.gitconnected.com/from-vue-class-component-to-composition-api-ef3c3dd5fdda)
* Vuex is being deprecated so let's use [Pinia! 🍍](https://pinia.vuejs.org/core-concepts/)
* [More about Pinia](https://www.vuemastery.com/blog/advantages-of-pinia-vs-vuex/)
* [Vite Configuration Reference](https://vitejs.dev/config/)
* [Static deployment using Vite](https://vitejs.dev/guide/static-deploy.html)
* [Render Deployment](https://dashboard.render.com/)
    - you can connect your github repo to Render and it will automatically deploy when new commits are pushed. neat!
    - [important notes about deploying Vue apps using redirects for proper router behavior](https://render.com/docs/deploy-vue-js)
    - see this app in action at [https://vue3-boilerplate.onrender.com/](https://vue3-boilerplate.onrender.com/)
* [Vuetify 3 beta](https://next.vuetifyjs.com/en/)
* [Material Design Icons](https://materialdesignicons.com/)
* [lint](https://eslint.org/)
* For Vue3 it is recommended to disable Vetur and use VSCode extensions [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) and [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
* [adding Auth0 to an existing Vue3 app](https://developer.auth0.com/resources/guides/spa/vue/basic-authentication)
* [Vue app with express backend and Auth0](https://auth0.com/blog/how-to-make-secure-http-requests-with-vue-and-express/)
* [guide to Auth0 in Vue3](https://developer.auth0.com/resources/code-samples/full-stack/hello-world/basic-access-control/spa/vue-javascript-with-composition-api/express-typescript)


## To-do
* when it's done-ish, pull to-do list from v1.0 and work on that
* add alert banner warning that data is persistent but subject to change
* auth and store: investigate using a plugin for auth0-vue sdk
* do something with LogIn view, or remove it
* lazy-loading in router/index.ts
* fonts, my dude
* contact form?
* improve or remove page loader -- combine with other app loading state (isLoading = auth.isLoading || appState.isLoading)
* get knowing about CompositionAPI and OptionsAPI -- check that you're using best practices
* scss -- maybe? css may be preferred


## Type Support for `.vue` Imports in TS
If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

