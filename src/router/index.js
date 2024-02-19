import { createRouter, createWebHistory } from 'vue-router';
import HeaderComponent from '../components/HeaderComponent';
import LoginComponent from '../components/LoginComponent'
import ModalComponent from '../components/ModalComponent'
import NotLoginMainComponent from '../components/NotLoginMainComponent'
import SignupComponent from '../components/SignupComponent'


const routes = [
    { path: '/', redirect: '/notlogin', },
    { path: '/header', component: HeaderComponent, },
    { path: '/login', component: LoginComponent, },
    { path: '/modal', component: ModalComponent, },
    { path: '/notlogin', component: NotLoginMainComponent, },
    { path: '/signup', component: SignupComponent, },
  ];
  
  export default createRouter({
    history: createWebHistory(),
    routes,
  });