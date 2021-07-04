//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { authentication } from './authentication.module';
import { feed } from './feed.module';

const store = createStore({
  modules: {
    authentication,
    feed
  }
})

export default store;