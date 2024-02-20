<!-- ParentComponent.vue -->

<template>
  <div class="nav-bar">
    <div style="left: 96px; top: 41px; position: absolute; color: #FF4500; font-size: 32px; font-family: Newsreader; font-weight: 500; line-height: 32px; word-wrap: break-word">
      <a class="navbar-brand mx-auto" href="/">LogEat</a>
    </div>
      <div v-if="isLogin"> <!-- 로그인 되고 나서-->
        <button class="write-button">글쓰기</button> 
        <div style="width: 48px; height: 48px; left: 84%; top: 33px; position: absolute; cursor: pointer;">
          <img alt="?" src="../assets/Hamburger_LG.png" @click="toggleDropdown">
          <div v-if="isDropdownOpen || isLogin" style="position: absolute; top: 56px; background: white; border: 1px solid #E8E8E8; border-radius: 8px; padding: 12px;">
            <button class="dropdown-white" @click="showMyProfile">내 정보</button>
            <button class="dropdown-white" @click="showMyPosts">내가 쓴 글</button>
            <button class="dropdown-orange" @click="logoutFunction">로그아웃</button>
          </div>  
        </div>
      </div>
      <div> <!-- 로그인 -->
        <button class="login-button" @click="openLoginModal">로그인</button>
          <ModalLoginComponent v-if="isModalLoginOpen"/>
          <!-- <router-link class="signup-button" to="/modalsignup">회원가입</router-link> -->
        <button style="margin-left: 30px" class="signup-button" @click="openSignupModal">회원가입</button>
          <ModalSignupComponent v-if="isModalSignupOpen"/>
      </div>

  
  </div>
</template>

<script>
//import ModalComponent from '@/components/ModalComponent.vue';
import ModalLoginComponent from '@/components/ModalLoginComponent.vue';
import ModalSignupComponent from '@/components/ModalSignupComponent.vue';

export default {
  components: {
    //ModalComponent,
    ModalLoginComponent,
    ModalSignupComponent
  },
  data() {
    return {
      isDropdownOpen: false,
      isLogin: false,
      userRole: null,
      // isModalOpen: false, // 모달 상태 변수 추가
      isModalSignupOpen : false,
      isModalLoginOpen : false,
    };
  },
  methods: {
    openSignupModal() {
      this.isModalSignupOpen = !this.isModalSignupOpen;
    },
    openLoginModal() {
      this.isModalLoginOpen = !this.isModalLoginOpen;
    },
    logoutFunction() {
      localStorage.clear();
      window.location.reload();
    },
    submitForm() {
      // 폼 제출 로직
    },
    setsignupclosed(issignupclosed) {
      console.log("자식 컴포넌트 전달받음: ", issignupclosed);
      this.isModalLoginOpen = issignupclosed;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
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
    width : 185px;
    height: 50px;
    background: white;
    color: #8A8A8A;
    border-radius: 8px;
    font-family: Inter;
    font-size: 16px;
    border: none;
  }
  .dropdown-orange {
    width : 185px;
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
    border: none; /* Assuming you don't need a border on the button */
  }
  .dropdown-menu {
    position: absolute;
    top: 56px; /* Offset to appear below the image */
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
    border: none; /* Assuming you don't need a border on the button */
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
    border: none; /* Assuming you don't need a border on the button */
  }
  </style>