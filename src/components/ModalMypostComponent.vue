<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalOpen" class="modal-container" ref="modalContainer" >
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <MyPostComponent @openMypageModal="openMypageModal" @closemypostModal="closeModal"/>
        <!-- <component :is="currentModalComponent" @closeModal="closeModal" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import MyPostComponent from './MyPostComponent.vue';

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
            this.currentModalComponent = MyPostComponent;
        },
        closeModal() {
          this.isModalOpen = false;
          this.currentModalComponent = null;
        },
    },
    components: {MyPostComponent }
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
  padding: 20px; /* 상하좌우 패딩 조정 */
  width: 50%; /* 모달 너비를 화면 너비의 50%로 설정 */
  max-width: 400px; /* 최대 너비 설정 */
  max-height: 80%; /* 모달의 최대 높이를 화면의 80%로 설정 */
  margin: 20px auto; /* 상하 마진 20px, 좌우 마진 자동으로 중앙 정렬 */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: auto; /* 내용이 넘칠 경우 스크롤바 생성 */
  text-align: center; /* 텍스트 가운데 정렬 */
  background: white;
}




.modal-inner {
  max-width: 100%; /* 내부 컨텐츠의 최대 너비를 모달 너비에 맞춤 */
  margin: 0 auto; /* 중앙 정렬 */
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
