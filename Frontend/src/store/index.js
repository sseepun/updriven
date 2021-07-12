//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { authentication } from './authentication.module';
import { post } from './post.module';
import { category } from './category.module';
import { alert } from './alert.module';
import { socketIO } from './socketIO.module';

const store = createStore({
  modules: {
    authentication,
    post,
    category,
    alert,
    socketIO,
  }
})

export default store;