import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import roles from './modules/roles';
import menuRoles from './modules/menuroles';
import adminRoles from './modules/adminroles';
import adminInfo from './modules/admininfo';
import opCenters from './modules/opCenters';
import mallProduct from './modules/mallproduct';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    roles,
    menuRoles,
    adminRoles,
    adminInfo,
    opCenters,
    mallProduct
  }
});

export default store
