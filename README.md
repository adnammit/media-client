# MEDIA CLIENT

Client that sits on the Media Service and Media Database. Uses Vue3, Vite, Pinia, Vuetify 3 beta, TS and Auth0

## Quickstart

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

## A Note On Authorization
* it's not great. this is just a demo. we don't even store a password because i don't want to tempt anyone to give me something sensitive (say, a pw that's tied to like 83 other actual websites with actual data)
* email doesn't even have to be real -- auth is simply based on a username/email string pair that you will (hopefully) remember and use to login
* I might use localStorage to save user creds (so you can refresh at-will without having to login) but this is susceptible to attacks, so again **PUT NOTHING SACRED INTO THIS WEBSITE** -- not your banking password, maybe not even your real email, not your hopes and dreams
* ideally look into storing user info in cookies using HttpOnly or going all in and learning about/implementing OAuth


## To-do
* **start here** mobile filter funcs not found
* finish writing out genre types
* use the same component for SearchDetail and MediaDetail if possible
* add more info to search so you can tell what you're looking at
* surprise!
* add sort options
* look for `TODO` in comments
* implement or remove poster preview
* option to set your streaming services and highlight titles that are on them
* error display
* import/export option
* check out [this api](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability) to supply streaming availability
* when it's done-ish, pull to-do list from v1.0 and work on that
* add alert banner warning that data is persistent but subject to change
* lazy-loading in router/index.ts
* fonts, my dude
* contact form?
* improve or remove page loader
* scss -- maybe? css may be preferred
* see if i can detect dark mode and set to dark automatically:
    ```js
    const isDarkMode = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Testing
    console.log(isDarkMode());
    ```
* check out [animations](https://vuejs.org/guide/extras/animation.html#class-based-animations)

## Done
* mobile-friendly navBar
* mobile-friendly detail view
* scratch auth0 for simplicity's sake
* on login/signup, show loading bc prod db is slow
* login is case sensitive -- make it not so
* add mediaDetail modal to add a search item to collection; make sure you clear search props when opening modal
* can i filter cards like a table? or can i make a table look like cards? -- yeah i think you just... filter the list...?
* show which filter buttons are selected
* get knowing about CompositionAPI and OptionsAPI -- check that you're using best practices
* fix referenceError in sub menus in mobile navbar
* wrap service stuff in try/catch -- cors errors etc are not getting caught
* clean up loading in modals -- lock them once an action is submitted


## Type Support for `.vue` Imports in TS
If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

