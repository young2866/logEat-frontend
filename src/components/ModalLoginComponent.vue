<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalOpen" class="modal-container" @click="handleModalClick">
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <LoginComponent @openSignupModal="openSignupModal" @closeSignupModal="closeSignupModal" @closeModal="closeModal"/>
        <!-- <component :is="currentModalComponent" @closeModal="closeModal" /> -->
      </div>
      <!-- <button @click="closeModal">Close</button> -->
    </div>
  </div>

  <div v-if="isSignModalOpen" class="modal-container">
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <SignupComponent @closeSignupModal="closeSignupModal"/>
        <!-- <SignupComponent @openSignupModal="openSignupModal" @closeModal="closeSignupModal"/>         -->
      </div>
    </div>
  </div>
  
</template>

<script>
import LoginComponent from './LoginComponent.vue';
import SignupComponent from './SignupComponent.vue';


export default {
  props:['isModalSignupOpen'],
  data() {
    return {
      isModalOpen: true,
      isSignModalOpen: false,
      currentModalComponent: null,
    };
  },
  methods: {
    openSignupModal() {
      console.log("모달로그인컴포넌트 openSignupModal() 실행 111")
      this.isSignModalOpen = true;
    },
    openLoginModal() {
      console.log("모달로그인컴포넌트 openLoginModal() 실행");
      this.isModalOpen = true;
      this.currentModalComponent = LoginComponent;
    },
    closeModal() {
      console.log("모달로그인컴포넌트 closeModal() 실행 111")
      this.isModalOpen = false;
    },
    closeSignupModal() {
      console.log("모달로그인컴포넌트 closeSignupModal() 실행 111")
      this.isSignModalOpen = false;
    },
    handleModalClick(event) {
      // 모달 배경 클릭 시 모달 닫기
      if (event.target === this.$refs.modalContainer) {
        this.closeModal();
      }
    },
  },
  components: { LoginComponent, SignupComponent }
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-inner {
  /* 추가된 부분 */
  width: 100%;
  height: 100%;
  overflow: auto;
}

button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
