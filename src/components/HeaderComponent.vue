<!-- ParentComponent.vue -->

<template>
  <div class="nav-bar">
    <div style="left: 96px; top: 41px; position: absolute; color: #FF4500; font-size: 32px; font-family: Newsreader; font-weight: 500; line-height: 32px; word-wrap: break-word">
      <a class="navbar-brand mx-auto" href="/">LogEat</a>
    </div>
    <div v-if="!isLogin"> <!-- 로그인 되고 나서-->
      <button class="write-button" @click="openPostCreateModal">글쓰기</button>
      <ModalPostCreate v-if="isModalPostCreateOpen" ></ModalPostCreate>
      <div style="width: 48px; height: 48px; left: 84%; top: 33px; position: absolute; cursor: pointer;">
        <img alt="?" src="../assets/Hamburger_LG.png" @click="toggleDropdown">
        <div v-if="isDropdownOpen || isLogin"
          style="z-index: 1000; position: absolute; top: 56px; background: white; border: 1px solid #E8E8E8; border-radius: 8px; padding: 12px;">
          <button class="dropdown-white" @click="openMypageModal">내 정보</button>
          <ModalMypageComponent v-if="isModalMypageOpen"></ModalMypageComponent>
          <button class="dropdown-white" @click="showMyPosts">내가 쓴 글</button>
          <button class="dropdown-orange" @click="logout">로그아웃</button>
        </div>
      </div>
    </div>
    <div v-if="isLogin"> <!-- 로그인 -->
      <button class="login-button" @click="openLoginModal">로그인</button>
      <ModalLoginComponent v-if="isModalLoginOpen" />
      <!-- <router-link class="signup-button" to="/modalsignup">회원가입</router-link> -->
      <button style="margin-left: 30px" class="signup-button" @click="openSignupModal">회원가입</button>
      <ModalSignupComponent v-if="isModalSignupOpen" />
    </div>


  </div>
</template>

<script>

//import ModalComponent from '@/components/ModalComponent.vue';
import ModalLoginComponent from '@/components/ModalLoginComponent.vue';
import ModalSignupComponent from '@/components/ModalSignupComponent.vue';
import ModalMypageComponent from './ModalMypageComponent.vue';
import ModalPostCreate from './ModalPostCreate.vue';

export default {
  components: {
    //ModalComponent,
    ModalLoginComponent,
    ModalSignupComponent,
    ModalMypageComponent,
    ModalPostCreate,
  },
  data() {
    return {
      isDropdownOpen: false,
      isLogin: !localStorage.getItem('access_token'),
      userRole: null,
      // isModalOpen: false, // 모달 상태 변수 추가
      isModalSignupOpen: false,
      isModalLoginOpen: false,
      isModalMypageOpen: false,
      isModalPostCreateOpen: false,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      // 로그아웃 로직: 로컬 스토리지의 토큰을 제거하고 상태를 업데이트합니다.
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token'); // 필요한 경우 refresh_token도 제거
      this.isLogin = false;
      window.location.href = '/';
    },
    openSignupModal() {
      console.log("헤더컴포넌트 openSignupModal() 실행111")
      this.isModalSignupOpen = !this.isModalSignupOpen;
    },
    openLoginModal() {
      console.log("헤더컴포넌트 openLoginModal() 실행111")
      this.isModalLoginOpen = !this.isModalLoginOpen;
    },
    setsignupclosed(issignupclosed) {
      console.log("자식 컴포넌트 전달받음: ", issignupclosed);
      this.isModalLoginOpen = issignupclosed;
    },
    openMypageModal() {
      this.isModalMypageOpen = !this.isModalMypageOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    showMyProfile(){
      this.$router.push('/mypage');
    },
    openPostCreateModal(){
      this.isModalPostCreateOpen = !this.isModalPostCreateOpen;
    }
  },
};
</script>

  
<style>
.navbar-brand:visited,
.navbar-brand:link,
.navbar-brand:hover,
.navbar-brand:active {
  color: inherit;
  text-decoration: none;
}

.login-button:hover {
  background-color: #EAEBEC;
}

.signup-button:hover {
  text-decoration: underline;
}

.write-button:hover {
  text-decoration: underline;
}

.dropdown-orange:hover {
  text-decoration: underline;
}

.nav-bar {
  width: auto;
  height: 112px;
  position: relative;
  background: white;
  border-bottom: 1px #E8E8E8 solid;
}

.dropdown-white:hover {
  background-color: #EAEBEC;
}

.dropdown-white {
  width: 185px;
  height: 50px;
  background: white;
  color: #8A8A8A;
  border-radius: 8px;
  font-family: Inter;
  font-size: 16px;
  border: none;
}

.dropdown-orange {
  width: 185px;
  height: 50px;
  background: #FF4500;
  color: white;
  border-radius: 8px;
  font-family: Inter;
  font-size: 16px;
  border: none;
}

.write-button {
  width: 126px;
  height: 48px;
  position: absolute;
  top: 33px;
  left: 88%;
  background: #FF4500;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 20.80px;
  word-wrap: break-word;
  border: none;
  /* Assuming you don't need a border on the button */
}

.dropdown-menu {
  position: absolute;
  top: 56px;
  /* Offset to appear below the image */
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  padding: 12px;
}

.signup-button {
  width: 126px;
  height: 48px;
  position: absolute;
  top: 33px;
  left: 88%;
  background: #FF4500;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 20.80px;
  word-wrap: break-word;
  border: none;
  /* Assuming you don't need a border on the button */
}

.login-button {
  width: 126px;
  height: 48px;
  position: absolute;
  top: 33px;
  left: 80%;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  color: 8A8A8A;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 20.80px;
  word-wrap: break-word;
  border: none;
  /* Assuming you don't need a border on the button */
}</style>