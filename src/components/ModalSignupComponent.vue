<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalOpen" class="modal-container" ref="modalContainer" @click="handleModalClick">
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <SignupComponent @closeModal="closeModal"/>
        <!-- <component :is="currentModalComponent" @closeModal="closeModal" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import SignupComponent from './SignupComponent.vue';
// import LoginComponent from './LoginComponent.vue';

export default {
    data() {
        return {
            isModalOpen: true,
            currentModalComponent: null,
            issignupclosed : false,
        };
    },
    methods: {
        openSignupModal() {
            this.isModalOpen = false;
            this.currentModalComponent = SignupComponent;
        },
        // openLoginModal() {
        //   this.isModalOpen = true;
        //   this.currentModalComponent = LoginComponent;
        // },
        closeModal() {
            this.isModalOpen = false;
            this.currentModalComponent = null;
            //this.isClosed = false;
            this.$emit("setsignupclosed", this.issignupclosed);
        },
        handleModalClick(event) {
            // 모달 배경 클릭 시 모달 닫기
            if (event.target === this.$refs.modalContainer) {
                this.closeModal();
            }
        },
    },
    components: { SignupComponent }
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
