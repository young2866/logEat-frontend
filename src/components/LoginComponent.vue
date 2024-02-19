<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="back-button" @click="goBack">
        <button class="back-button-content">
          ⬅︎ BACK
        </button>
      </div>
      <!-- 모달 내용 -->
      <div class="login-window">
        <div class="login-form">
          <div class="title">로그인</div>
          <div class="form-field">
            <label for="email">이메일</label>
            <input type="email" name="email" placeholder="이메일을 입력해주세요." />
          </div>
          <div class="form-field">
            <label for="password">비밀번호</label>
            <input type="password" name="password" placeholder="비밀번호를 입력해주세요." />
          </div>
          <button @click="submitForm" class="login-button">로그인</button>
          <button class="kakao-login-button">카카오 로그인</button>
          <div class="signup-link">아직 회원이 아니신가요? <span class="signup-text">회원 가입</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  left: 16px;
  top: 16px;
}

.arrow-icon {
  width: 24px;
  height: 24px;
  vertical-align: top;
}

.login-window {
  width: 100%;
  height: 100%;
  position: relative;
}

.login-form {
  width: 400px;
  height: 571px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.title {
  width: 111px;
  height: 38.60px;
  color: black;
  font-size: 30px;
  font-family: Inter;
  font-weight: 700;
  word-wrap: break-word;
  margin-top: 0;
}

.form-field {
  margin-bottom: 15px;
}

label {
  display: block;
  color: #696F79;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  word-wrap: break-word;
  margin-bottom: 5px;
}

input {
  width: 100%;
  height: 48px;
  padding: 0px 16px;
  border-radius: 6px;
  border: 1px #8692A6 solid;
}

.login-button,
.kakao-login-button {
  width: 100%;
  height: 48px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: none;
  text-align: center;
  font-size: 22px;
  font-family: Inter;
  font-weight: 500;
  line-height: 28.60px;
  word-wrap: break-word;
  cursor: pointer;
  margin-top: 10px;
}


</style>