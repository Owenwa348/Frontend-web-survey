import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Assessment from '../views/Assessment.vue'
import AboutUs from '../views/AboutUs.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'
import UserEditView from '../views/UserEditView.vue'
import OtpVerify from '../views/OtpVerify.vue';
import ExcelUpload from '../views/ExcelUploadView.vue'


const isAuthenticated = () => {
   return !!localStorage.getItem('access_token');
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/assessment',
    name: 'Assessment',
    component: Assessment,
    meta: { requiresAuth: true } 
  },
  {
    path: '/about',
    name: 'About',
    component: AboutUs
  },
  {
    path: '/upload-excel',
    name: 'UploadExcel',
    component: ExcelUpload
  },

  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },

  { path: '/login', 
    component: Login 
  },

  { path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard},
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },

  {
    path: '/users/edit/:id',
    name: 'UserEdit',
    component: UserEditView
  },
{
  path: '/team/:id',
  name: 'TeamMemberProfile',
  component: () => import('../views/TeamMemberProfile.vue'),
  props: true
},
  { path: '/', component: Login },
  { path: '/otp', component: OtpVerify },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/login' }) // ถ้าไม่ login กลับไป login
  } else {
    next()
  }
})

export default router