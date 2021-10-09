//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { authentication } from './authentication.module';
import { post } from './post.module';
import { category } from './category.module';
import { alert } from './alert.module';
import { socketIO } from './socketIO.module';
import { axios } from './axios.module'
import { csc } from './csc.module'
import { sponsor } from './sponsor.module';
const store = createStore({
  modules: {
    authentication,
    post,
    category,
    alert,
    socketIO,
    axios,
    csc,
    sponsor
  }
})

export default store;