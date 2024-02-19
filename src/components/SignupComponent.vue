<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="back-button" @click="goBack">
        <button class="back-button-content">
          ⬅︎ BACK
        </button>
      </div>
      <!-- 모달 내용 -->
      <div class="modal-title">회원가입</div>
      <div class="input-field">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="input-field">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input-field">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="submit-button" @click="submitForm">회원 가입</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    goBack() {
      // 모달 닫기 로직을 여기에 추가
      console.log('뒤로 가기 클릭');
    },
    submitForm() {
      // 회원 가입 양식 제출 로직을 여기에 추가
      console.log('회원 가입 양식 제출');
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
  height: 70%;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.back-button {
  margin-top: 10px;
}

.back-button-content {
  position: absolute;
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

.arrow-icon {
  width: 24px;
  height: 24px;
  vertical-align: top;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 80px;
  margin-left: 50px;
  margin-bottom: 30px;
}

.input-field {
  margin-left: 50px;
  margin-right: 61.5px;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #FF4500;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 40px;
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
}
</style>
