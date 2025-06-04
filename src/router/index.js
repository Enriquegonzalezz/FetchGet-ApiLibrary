import { createRouter, createWebHistory } from 'vue-router';
import ApiLibraryView from '../views/ApiLibraryView.vue'; 
import ApiDetailView from '../views/ApiDetailView.vue'; 
import Login from '../views/Login.vue'
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

router.beforeEach(async (to, from, next) => {
  const protectedRoutes = ['/admin/dashboard', '/admin/createapis'];
  const token = localStorage.getItem('token');

  // Si intenta acceder a /login y ya está autenticado, redirige al dashboard
  if (to.path === '/login' && token) {
    try {
      const res = await fetch('/admin-auth/auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.valid) {
        return next('/admin/dashboard');
      }
    } catch (e) {
      // Si hay error, sigue a login
    }
    return next();
  }

  // Proteger rutas de admin
  if (protectedRoutes.includes(to.path)) {
    if (!token) {
      return next('/login');
    }
    try {
      const res = await fetch('/admin-auth/auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!data.valid) {
        localStorage.removeItem('token');
        return next('/login');
      }
      return next();
    } catch (e) {
      return next('/login');
    }
  } else {
    return next();
  }
});

export default router;