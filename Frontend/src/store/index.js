//import Vuex from 'vuex';
import { createStore } from 'vuex'

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { axios } from './axios.module';
import { category } from './category.module';
import { csc } from './csc.module';
import { post } from './post.module';
import { profile } from './profile.module';
import { sponsor } from './sponsor.module';
import { socketIO } from './socketIO.module';
import { search } from './search.module';

const store = createStore({
  modules: {
    alert,
    authentication,
    axios,
    category,
    csc,
    post,
    profile,
    sponsor,
    socketIO,
    search,
  }
})

export default store;