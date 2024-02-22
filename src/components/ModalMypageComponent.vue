<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalOpen" class="modal-container" ref="modalContainer" >
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <MypageComponent @openMypageModal="openMypageModal" @closemypageModal="closeModal"/>
      </div>
    </div>
  </div>
</template>

<script>
import MypageComponent from './MypageComponent.vue';

export default {
    data() {
        return {
            isModalOpen: true,
            currentModalComponent: null,
            issignupclosed : false,
        };
    },
    methods: {
        openMypageModal() {
            this.isModalOpen = true;
            this.currentModalComponent = MypageComponent;
        },
        closeModal() {
          this.isModalOpen = false;
        },
    },
    components: { MypageComponent }
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
  padding: 70px 20px; /* 위아래로 50px 증가, 좌우 패딩은 20px로 조정 */
 /* 너비를 줄임 */
  max-width: 800px; /* 최대 너비를 800px로 조정 */
  margin: 20px auto; /* 위아래 마진 유지, 좌우는 자동으로 중앙 정렬 */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
  height: 400px;
  width: 380px;
}

.modal-inner {
  max-width: 100%; /* 내부 컨텐츠가 modal-content 너비에 맞게 조정 */
  margin: 0 auto; 
  height: auto;
  overflow: auto;
}

.mypage-container {
  max-width: 100%; /* modal-inner의 너비에 맞춰 조정 */
  margin: 0 auto; 
  padding: 20px;
}

button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
