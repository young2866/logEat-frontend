<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="back-button">
        <button class="back-button-content" @click="closeModal">
          ⬅︎ BACK
        </button>
      </div>
      <div class="login-window">
        <div class="title">로그인</div>
        <div class="form-field">
          <label for="email">이메일</label>
          <input type="email" name="email" placeholder="이메일을 입력해주세요." />
        </div>
        <div class="form-field">
          <label for="password">비밀번호</label>
          <input type="password" name="password" placeholder="비밀번호를 입력해주세요." />
        </div>
        <button class="login-button2" @click="submitForm">로그인</button>
        <button class="kakao-login-button">카카오 로그인</button>
        <div class="non-author">
          <span style="color: #696F79; font-size: small;">아직 회원이 아니신가요?</span>
          <button class="signup-text" @click="$emit('openSignupModal');">회원 가입</button>
            
            <!-- <ModalComponent ref="modalContainer"></ModalComponent> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import ModalComponent from '@/components/ModalComponent.vue';

//import ModalSignupComponent from '@/components/ModalSignupComponent.vue';

export default {
  components: {
    //ModalComponent,
    // ModalSignupComponent,
  },
  data() {
    return {

    };
  },
  methods: {
    submitForm() {
      console.log('회원 가입 양식 제출');
    },
    closeModal() {
      console.log("로그인컴포넌트 closeModal() 실행");
      this.$emit('closeModal');
    },
    handleModalClick(event) {
      // 모달 배경 클릭 시 모달 닫기
      if (event.target === this.$el) {
        this.$emit('closeModal');
      }
    },
  },
};
</script>

<style scoped>
/* 모달 스타일 */
.modal-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 30%;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.back-button {
  margin-bottom: 10px;
}

.back-button-content {
  color: #8692A6;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  word-wrap: break-word;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

.login-window {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 80px;
  margin-left: 50px;
  margin-bottom: 30px;
}

.form-field {
  margin-left: 50px;
  margin-right: 61.5px;
  margin-bottom: 15px;
}

label {
  display: block;
  color: #696F79;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  margin-bottom: 5px;
}

input {
  width: 100%;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button2 {
  background-color: #FF4500;
  color: white;
  width: 335px;
  height: 48px;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  border: none;
  margin-left: 50px;
  margin-right: 50px;
}

.kakao-login-button {
  background-color: #FEE500;
  color: black;
  width: 335px;
  height: 48px;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  border: none;
  margin-left: 50px;
  margin-right: 50px;
}

.non-author {
  font-size: small;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 80px;
}
.non-author span {
  color: #696F79;
}
.signup-text {
  color: #FF4500;
  cursor: pointer;
  background: none;
  border: none;
  font-size: small;
  margin-left: 5px;
}
</style>
