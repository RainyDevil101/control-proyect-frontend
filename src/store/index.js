import { createStore } from 'vuex'

import auth from './modules/auth';
import home from './modules/home';
import materials from './modules/material';
import destinations from './modules/destination';
import divisions from './modules/division';
import users from './modules/user';

export default createStore({
  modules: {
    auth,
    home,
    materials,
    destinations,
    divisions,
    users,
  }
})