import { createStore } from 'vuex'

import auth from './modules/auth';
import materials from './modules/material';
import refunds from './modules/refund';
import destinations from './modules/destination';
import places from './modules/place';
import divisions from './modules/division';
import clients from './modules/client';
import dispatchPlaces from './modules/place';
import users from './modules/user';

export default createStore({
  modules: {
    auth,
    materials,
    refunds,
    destinations,
    places,
    divisions,
    clients,
    dispatchPlaces,
    users,
  }
})