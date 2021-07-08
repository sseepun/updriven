//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { authentication } from './authentication.module';
import { post } from './post.module';
import { category } from './category.module';
import { alert } from './alert.module';

const store = createStore({
  modules: {
    authentication,
    post,
    category,
    alert
  }
})

export default store;