//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { authentication } from './authentication.module';

const store = createStore({
  modules: {
    authentication
  }
})

export default store;