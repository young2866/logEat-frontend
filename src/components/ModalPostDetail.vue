<!-- ModalComponent.vue -->
<template>
    <div v-if="isModalOpen" class="modal-container" ref="modal-container">
      <div class="modal-content" @click.stop>
        <div class="modal-inner">
          <PostDetail :id="id" @openPostDetailModal="openPostDetailModal" @closeModal="closeModal"/>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  import PostDetail from './PostDetail.vue';
  
  export default {
    props: ['id'],
    data() {
      return {
        isModalOpen: true,
        currentModalComponent: null,
      };
    },
    methods: {
      openPostDetailModal(id) {
        this.isModalOpen = true;
        this.currentModalComponent = PostDetail;
      },
      closeModal() {
        this.isModalOpen = false;
        this.currentModalComponent = null;
      },
    },
    components: { PostDetail }
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
    width: 50%;
    height: 95%;
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
  