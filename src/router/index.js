import { createRouter, createWebHistory } from 'vue-router';
import ApiLibraryView from '../views/ApiLibraryView.vue'; 
import ApiDetailView from '../views/ApiDetailView.vue'; 
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue' 
import CreateApiView from '../views/CreateApiView.vue'

const routes = [
  {
    path: '/', 
    redirect: '/apis'
  },
  {
    path: '/apis',
    name: 'ApiLibrary',
    component: ApiLibraryView
  },
  {
    path: '/apis/:apiName', 
    name: 'ApiDetail',
    component: ApiDetailView,
    props: true
  },
   {
     path: '/login',
     name: 'Login',
     component: Login 
   },
   {
     path: '/admin/dashboard',
     name: 'Dashboard',
     component: Dashboard, 
   },
   {
    path: '/admin/createapis',
    name: 'CreateApi',
    component: CreateApiView
   }
 
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});


export default router;