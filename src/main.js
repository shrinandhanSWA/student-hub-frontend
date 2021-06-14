import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueClosable from 'vue-closable'
import humanizeDate from './filters/humanizeDate'
import authMixin from './mixins/authMixin'
import firebase from 'firebase'
import { CometChat } from '@cometchat-pro/chat'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: 'AIzaSyDMgs6YfR36REw8BhFIvBHR1TnZ6a4ks_I',
  authDomain: 'drp-project-database.firebaseapp.com',
  projectId: 'drp-project-database',
  storageBucket: 'drp-project-database.appspot.com',
  messagingSenderId: '911564541141',
  appId: '1:911564541141:web:fe92871bc0962cef88a65c',
  measurementId: 'G-M2T3QEHXDC'
}

firebase.initializeApp(firebaseConfig)

// const region = 'eu'
// const appSetting = new CometChat.AppSettingsBuilder()
// .subscribePresenceForAllUsers()
// .setRegion(region)
// .build()
//
// CometChat.init(process.env.VUE_APP_COMETCHAT_APP_ID, appSetting).then(
//   () => {
//     console.log('Initialization completed successfully')
//     // You can now call login function.
//   },
//   error => {
//     console.log('Initialization failed with error:', error)
//     // Check the reason for error and take appropriate action.
//   }
// )

Vue.use(Vuelidate)
Vue.use(VueClosable)

Vue.filter('humanizeDate', humanizeDate)

Vue.mixin(authMixin)

// Import all base components
const requireComponent = require.context('./components', true, /Base[A-Z]/)
requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
    .replace(/^.+\//, '')
    .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('auth_token')
  if (token && !store.getters.isLoggedIn) {
    try {
      await store.dispatch('loadCurrentUser')
    } catch (err) {
      console.log(err)
    }
  }

  if (to.meta.auth && !store.getters.isLoggedIn) {
    store.dispatch('setNextRoute', { route: to.fullPath })
    return next({ name: 'Login' })
  }

  if (to.meta.guest && store.getters.isLoggedIn) {
    return next({ name: 'Home' })
  }

  if (to.meta.permissions && !store.state.users.currentUser.can(
    to.meta.permissions)) {
    return next({ name: 'NotFound', params: [to.path], replace: true })
  }

  if (store.state.nextRoute && to.name !== 'Login') {
    const nextRoute = store.state.nextRoute
    store.dispatch('setNextRoute', { route: null })
    return next(nextRoute)
  }

  next()
})

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
