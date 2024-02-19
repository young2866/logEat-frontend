<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <ModalComponent ref="modalContainer">
      <p>This is a modal!</p>
    </ModalComponent>
  </div>
</template>

<script>
import ModalComponent from '@/components/ModalComponent.vue';

export default {
  components: {
    ModalComponent,
  },
  methods: {
    openModal() {
      // "this.$refs.modalContainer"가 정의되어 있는지 확인
      if (this.$refs.modalContainer) {
        this.$refs.modalContainer.openModal();
      } else {
        console.error("ModalContainer is not defined in $refs.");
      }
    },
  },
};
</script>
