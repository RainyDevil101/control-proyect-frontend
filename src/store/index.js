import { createStore } from 'vuex'

import auth from './modules/auth';
import home from './modules/home';
import materials from './modules/material';

export default createStore({
  modules: {
    auth,
    home,
    materials,
  }
})