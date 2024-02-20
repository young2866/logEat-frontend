<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalOpen" class="modal-container" ref="modalContainer" @click="handleModalClick">
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <component :is="currentModalComponent" @closeModal="closeModal" />
      </div>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import SignupComponent from './SignupComponent.vue';
import LoginComponent from './LoginComponent.vue';

export default {
  data() {
    return {
      isModalOpen: false,
      currentModalComponent: null,
    };
  },
  methods: {
    openSignupModal() {
      this.isModalOpen = true;
      this.currentModalComponent = SignupComponent;
    },
    openLoginModal() {
      this.isModalOpen = true;
      this.currentModalComponent = LoginComponent;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentModalComponent = null;
    },
    handleModalClick(event) {
      // 모달 배경 클릭 시 모달 닫기
      if (event.target === this.$refs.modalContainer) {
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
.modal-container {
  z-index: 1000;
  position: fixed;
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
