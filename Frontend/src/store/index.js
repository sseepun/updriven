//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { authentication } from './authentication.module';
import { post } from './post.module';
import { category } from './category.module';

const store = createStore({
  modules: {
    authentication,
    post,
    category
  }
})

export default store;