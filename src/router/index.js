import { createRouter, createWebHistory } from 'vue-router';
import HeaderComponent from '../components/HeaderComponent';
import LoginComponent from '../components/LoginComponent'
import SignupComponent from '../components/SignupComponent'
import ModalLoginComponent from '../components/ModalLoginComponent'
import ModalSignupComponent from '../components/ModalSignupComponent'
import ModalComponent from '../components/ModalComponent'
import NotLoginMainComponent from '../components/NotLoginMainComponent'
import MypageComponent from '../components/MypageComponent.vue'
import PostCreate from '../components/PostCreate'
import LatestPostComponent from '../components/LatestPostComponent'
import PostDetail from '../components/PostDetail'



const routes = [
    { path: '/', redirect: '/main', },
    { path: '/header', component: HeaderComponent, },
    { path: '/login', component: LoginComponent, },
    { path: '/signup', component: SignupComponent, },
    { path: '/modallogin', component: ModalLoginComponent, },
    { path: '/modalsignup', component: ModalSignupComponent, },
    { path: '/modal', component: ModalComponent, },
    { path: '/main', component: NotLoginMainComponent, },
    { path: '/mypage', component: MypageComponent },
    { path: '/post/create', component: PostCreate, },
    { path: '/post/following/latest-post', component: LatestPostComponent, },
    { path: '/post/:id/detail', component: PostDetail,  props: true },

    
  ];
  
  export default createRouter({
    history: createWebHistory(),
    routes,
  });