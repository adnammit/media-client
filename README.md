# MEDIA CLIENT

Client that sits on the Media Service and Media Database. Uses Vue3, Vite, Pinia, Vuetify 3, TS and Auth0

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
* [TheMovieDB API documentation](https://developers.themoviedb.org/3/getting-started/introduction)


## A Note On Authorization
* it's not great. this is just a demo. we don't even store a password because i don't want to tempt anyone to give me something sensitive (say, a pw that's tied to like 83 other actual websites with actual data)
* email doesn't even have to be real -- auth is simply based on a username/email string pair that you will (hopefully) remember and use to login
* I might use localStorage to save user creds (so you can refresh at-will without having to login) but this is susceptible to attacks, so again **PUT NOTHING SACRED INTO THIS WEBSITE** -- not your banking password, maybe not even your real email, not your hopes and dreams
* ideally look into storing user info in cookies using HttpOnly or going all in and learning about/implementing OAuth

## Feature List

### Implemented Features
* search movies and television shows available on IMDB/The Movie DB
* add searched items to your collection
* rate your items, mark them as watched, favorite, or queue them to watch next
* sort, filter and search within your collection
* pick a random item from your collection (or filtered collection)
* display info about which platforms a given title is available on

### Future Features
* custom user-defined lists
* notes field
* export data to csv/json -- you always own your data even if you hate UpNext and quit using it
* mass select/delete
* filter collection by streaming availability


## Dev To-do
* add user-defined lists:
	- view lists in side menu? what does mobile look like?
	- UX for adding to/editing a list
* sticky filter bar
* improve TitleDetail view
* do real authentication
* show rating/favorite/watched icons on collection cards
* we currently load/show streaming data only when an item is selected -- there's a limit of 10 requests per second so if we wanted to show this info at the collection level, we'd need to do some ghetto async loading in the background
* get cast/writer/director data and make it searchable and sortable
* go through genre filter and make sure you got'em all in your default seed list
* add special random function to home page maybe
* add ability to make notes on your titles
* look for `TODO` in comments
* import/export option
* StreamingAvailabilityApi uses MovieDB under the hood and exposes many of the same props so we could potentially use this instead. some missing/differences:
	* fewer genres
	* rating is out of 100 maybe, not out of 10, and is slightly different...?
	* tv has way more props in movieDb response
* option to set your streaming services and highlight titles that are on them
* other api integration options:
	- add [uNoGS](https://rapidapi.com/unogs/api/unogs) to query whether or not a movie is available on netflix
    - or try [Watch Here](https://rapidapi.com/devroldy/api/watch-here/details) -- get all the streaming things at once! -- would have to pay for this one
	- add [bechdel test api integration](https://bechdeltest.com/api/v1/doc)
* wow yr build takes one million years... see if you can delete some unused packages or something
* look for cool stuff to do with [this](https://next.vuetifyjs.com/en/components/overlays/#advanced)
* maybe look into [this](https://www.flaticon.com/animated-icons-most-downloaded) to spice things up
* all kinds of crazy animations [here](https://blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/)
* check out [animations](https://vuejs.org/guide/extras/animation.html#class-based-animations)
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
* add some sort options
* add more info to search so you can tell what you're looking at
* add find-in-collection
* implement Surprise!
* finish writing out genre types
* add genre filter
* limit random to filteredCollection
* use the same component for SearchDetail and MediaDetail if possible
* error display
* check out [this api](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability) to supply streaming availability
* improve streaming info display -- make it mobile friendly
* implement or remove poster preview


## Type Support for `.vue` Imports in TS
If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
	1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
	2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

