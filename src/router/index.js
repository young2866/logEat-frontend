import { createRouter, createWebHistory } from 'vue-router';
import HeaderComponent from '../components/HeaderComponent';
import LoginComponent from '../components/LoginComponent'
import SignupComponent from '../components/SignupComponent'
import ModalLoginComponent from '../components/ModalLoginComponent'
import ModalSignupComponent from '../components/ModalSignupComponent'
import ModalComponent from '../components/ModalComponent'
import NotLoginMainComponent from '../components/NotLoginMainComponent'
import PostCreate from '../components/PostCreate'

import LeftSectionComponent from '../components/LeftSectionComponent'
import CenterSectionComponent from '../components/CenterSectionComponent'



const routes = [
    { path: '/', redirect: '/main', },
    { path: '/header', component: HeaderComponent, },
    { path: '/login', component: LoginComponent, },
    { path: '/signup', component: SignupComponent, },
    { path: '/modallogin', component: ModalLoginComponent, },
    { path: '/modalsignup', component: ModalSignupComponent, },
    { path: '/modal', component: ModalComponent, },
    { path: '/main', component: NotLoginMainComponent, },
    { path: '/post/create', component: PostCreate, },
    { path: '/left', component: LeftSectionComponent, },
    { path: '/center', component: CenterSectionComponent, },
    
  ];
  
  export default createRouter({
    history: createWebHistory(),
    routes,
  });