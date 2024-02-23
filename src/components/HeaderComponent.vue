<!-- ParentComponent.vue -->

<template>
  <div class="nav-bar">
    <div
      style="left: 96px; top: 41px; position: absolute; color: #FF4500; font-size: 32px; font-family: Newsreader; font-weight: 500; line-height: 32px; word-wrap: break-word">
      <a class="navbar-brand mx-auto" href="/">LogEat</a>
    </div>
    <div v-if="!isLogin"> <!-- 로그인 되고 나서-->
      <button class="write-button" @click="openPostCreateModal">글쓰기</button>
      <ModalPostCreate v-if="isModalPostCreateOpen"></ModalPostCreate>
      <div style="width: 48px; height: 48px; left: 79%; top: 33px; position: absolute; cursor: pointer;"
        @click="notiDropdown">
        <img style="width: 40px; height: 43px;" alt="notification" src="../assets/notificationIcon.png">
        <div class="notification-dropdown" v-if="isNotiDropdownOpen"
          style="width: 200px; height: 300px; z-index: 500; position: absolute; top: 56px; background: white; border: 1px solid #E8E8E8; border-radius: 8px; padding: 12px;">
          <div class="notification-box">
            <div v-for="(notification, index) in notificationList" :key="index">
              <div class="content-info" @click="deleteNotification(notification.id)">
                <div class="dropdown-white" style="text-align: center;"><div style="margin-top: 15px;">{{ notification.message }}</div></div>
                  <!-- <div class="content-tag">{{ notification.senderName }}</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 48px; height: 48px; left: 83%; top: 33px; position: absolute; cursor: pointer;">
        <img alt="?" src="../assets/Hamburger_LG.png" @click="toggleDropdown">
        <div v-if="isDropdownOpen || isLogin"
          style="z-index: 500; position: absolute; top: 56px; background: white; border: 1px solid #E8E8E8; border-radius: 8px; padding: 12px;">
          <button class="dropdown-white" @click="openMypageModal">내 정보</button>
          <ModalMypageComponent v-if="isModalMypageOpen" />
          <button class="dropdown-white" @click="showMyPosts">내가 쓴 글</button>
          <ModalMypostComponent v-if="isModalMypostOpen"></ModalMypostComponent>
          <button class="dropdown-orange" @click="logout">로그아웃</button>
        </div>
        
      </div>
    </div>
    <div v-if="isLogin"> <!-- 로그인 -->
      <button class="login-button" @click="openLoginModal">로그인</button>
      <ModalLoginComponent v-if="isModalLoginOpen" @openLoginModal="openLoginModal" />
      <!-- <router-link class="signup-button" to="/modalsignup">회원가입</router-link> -->
      <button style="margin-left: 30px" class="signup-button" @click="openSignupModal">회원가입</button>
      <ModalSignupComponent v-if="isModalSignupOpen" @openSignupModal="openSignupModal" />
    </div>


  </div>
</template>

<script>

//import ModalComponent from '@/components/ModalComponent.vue';
import ModalLoginComponent from '@/components/ModalLoginComponent.vue';
import ModalSignupComponent from '@/components/ModalSignupComponent.vue';
import ModalMypageComponent from './ModalMypageComponent.vue';
import ModalPostCreate from './ModalPostCreate.vue';
import ModalMypostComponent from './ModalMypostComponent.vue';
import axiosInstance from '../axios/index.js'

export default {
  components: {
    //ModalComponent,
    ModalLoginComponent,
    ModalSignupComponent,
    ModalMypageComponent,
    ModalPostCreate,
    ModalMypostComponent,
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
      isModalMypostOpen: false,
      isNotiDropdownOpen: false,
      notificationId : null,
      notificationList: [],
    };
  },
  methods: {
    showMyPosts() {
    this.isModalMypostOpen = !this.isModalMypostOpen;
  },
    deleteNotification(id) {
      this.isNotiDropdownOpen = false;
      this.notificationId = id;
      axiosInstance.delete(
        '/notification/' + id
      )
      window.location.href =  "/";
    },
    async getNoitification() {
      axiosInstance.get(
        '/user/notifications'
      ).then((res) => {
        const receivedData = res.data.result;
        // 여기서 데이터 처리 (notificationList 업데이트)
        this.notificationList = receivedData;
        console.log(this.notificationList);

      });

    },
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
      this.isModalSignupOpen = !this.isModalSignupOpen;
    },
    openLoginModal() {
      this.isModalLoginOpen = !this.isModalLoginOpen;
    },
    setsignupclosed(issignupclosed) {
      this.isModalLoginOpen = issignupclosed;
    },
    openMypageModal() {
      this.isModalMypageOpen = !this.isModalMypageOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    notiDropdown() {
      this.isNotiDropdownOpen = !this.isNotiDropdownOpen;
      this.getNoitification();
    },
    showMyProfile() {
      this.$router.push('/mypage');
    },
    openPostCreateModal() {
      this.isModalPostCreateOpen = !this.isModalPostCreateOpen;
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
// 여기가 모달 열면 스크롤 막는 메소드
  openLoginModal() {
  this.isModalLoginOpen = true;
  localStorage.setItem('isModalOpen', 'true'); // 모달이 열릴 때
  this.preventBodyScroll(true); // 스크롤 방지 함수 호출
},
closeModal() {
  this.isModalLoginOpen = false;
  localStorage.removeItem('isModalOpen'); // 모달이 닫힐 때
  this.preventBodyScroll(false); // 스크롤 방지 해제 함수 호출
},
preventBodyScroll(isPrevent) {
  if (isPrevent) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
},
// 여기 까지
  



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

.notification-box {
  /* margin-top: 5px;
  width: 185px;
  height: 50px;
  background: white;
  color: #8A8A8A;
  border-radius: 8px;
  font-family: Inter;
  font-size: 16px;
  border: none; */
  
  margin-top: 5px;
  width: 185px; /* 너비 조정 */
  background: white;
  color: #8A8A8A;
  border-radius: 8px;
  font-family: Inter;
  font-size: 16px;
  border: none;
  
  
}
.content-info {
    display: flex;
    align-items: center; /* 세로 방향 중앙 정렬 */
    justify-content: center;
    
    margin-left: 10%;
    margin: 5px 0;
  }

.notification-image {
    margin-right: 10px; /* 이미지와 텍스트 사이 간격 조정 */
    
    flex-shrink: 0;
  margin-right: 10px; /* 이미지와 텍스트 사이 간격 */
  width: 40px;
  }

.content-detail {
    width: 200px;

}
.notification-dropdown {
  /* height: auto;
  
  width: auto;
  height: auto;
  z-index: 500;
  position: absolute;
  top: 56px;
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  padding: 12px; */
  width: auto; /* 내부 콘텐츠에 따라 너비 조정 */
  height: auto; /* 내용에 따라 높이 조정 */
  z-index: 500;
  position: absolute;
  top: 56px;
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  padding: 12px;
}
.notification-image{
  
    margin-right: 10px;
    width: 40px;
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
  color: #8A8A8A;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 20.80px;
  word-wrap: break-word;
  border: none;
  /* Assuming you don't need a border on the button */
}
</style>