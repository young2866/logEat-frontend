<!-- SignupComponent.vue -->
<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="back-button">
        <button class="back-button-content" @click="$emit('closeModal')">
          ⬅︎ BACK
        </button>
      </div>
      <!-- 모달 내용 -->
      <div class="modal-title">회원가입</div>
      <div class="input-field">
        <label for="nickname">닉네임</label>
        <input type="text" id="nickname" v-model="nickname" :readOnly="isNicknameUsed"
          :style="{ backgroundColor: isNicknameUsed ? '#F1F3F5' : '' }" placeholder="닉네임을 입력해주세요." />
        <button v-show="!isNicknameUsed" @click="checkNickname" class="nickname-dupcheck-button">중복 체크</button>
        <button v-show="isNicknameUsed" class="disable-button" disabled>체크 완료</button>
        <span v-show="!nickname && isCheckingNickname">닉네임을 입력해주세요.</span>
      </div>
      <div class="input-field">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" :readOnly="isEmailUsed"
          :style="{ backgroundColor: isEmailUsed ? '#F1F3F5' : '' }" placeholder="이메일을 입력해주세요." />
        <button v-show="!isEmailUsed" @click="checkEmail" class="email-dupcheck-button">중복 체크</button>
        <button v-show="isEmailUsed & !emailCodeChecked" class="disable-button" disabled>{{ timer }}</button>
        <button v-show="emailCodeChecked" class="disable-button" disabled>체크 완료</button>
        <span v-show="!email && isCheckingEmail">이메일을 입력해주세요.</span>
      </div>
      <div class="input-field" v-show="isEmailUsed">
        <label for="code">이메일 확인 코드</label>
        <input type="text" id="code" v-model="code" :readOnly="emailCodeChecked"
          :style="{ backgroundColor: emailCodeChecked ? '#F1F3F5' : '' }" placeholder="코드를 입력해주세요." />
        <button v-show="!emailCodeChecked" @click="checkEmailCode" class="email-dupcheck-button">확인</button>
        <button v-show="emailCodeChecked" class="disable-button" disabled>체크 완료</button>
      </div>
      <div class="input-field">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" @blur="passwordValid" />
        <div style="color: red; font-family: Inter;" v-if="!passwordValidFlag">
          영문, 숫자, 특수문자를 최소 한 가지씩 조합하여 <br>8~16자리 비밀번호를 입력하세요.
        </div>
      </div>
      <div class="input-field">
        <label for="passwordConfirm">비밀번호 확인</label>
        <input type="password" id="passwordConfirm" v-model="passwordConfirm" @blur="passwordCheckValid" />
        <div style="color: red; font-family: Inter;" v-if="!passwordCheckFlag">
          비밀번호가 동일하지 않습니다.
        </div>
      </div>
      <div class="submit-button" @click="submitForm" v-show="AllThingOk">회원 가입</div>
      <div class="submit-button" style="background-color:#DDE6ED; cursor: default;" v-show="!AllThingOk">회원 가입</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      code: "",
      timer: 180,
      emailCodeChecked: false,
      isCheckingNickname: false,
      isNicknameUsed: false,
      isCheckingEmail: false,
      isEmailUsed: false,
      passwordValidFlag: false,
      passwordCheckFlag: false,
    };
  },
  computed: {
    AllThingOk() {
      return this.passwordCheckFlag && this.emailCodeChecked && this.isNicknameUsed && this.isEmailUsed;
    },
  },
  methods: {
    passwordCheckValid() {
      if (this.password === this.passwordConfirm) {
        this.passwordCheckFlag = true
      } else {
        this.passwordCheckFlag = false
      }
    },
    passwordValid() {
      if (/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(this.password)) {
        this.passwordValidFlag = true
      } else {
        this.passwordValidFlag = false
      }
    },
    startTimer() {
      this.isTimerStarted = true;
      this.intervalId = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          clearInterval(this.intervalId);
          this.isTimerStarted = false;
          this.isEmailUsed = false;
          alert("유효시간이 만료되었습니다. 다시 시도해주세요.");
        }
      }, 1000);
    },
    async checkNickname() {
      try {
        if (!this.nickname) {
          alert("닉네임을 입력해주세요.");
          return;
        }
        this.isCheckingNickname = true;
        const response = await axios.get(
          "http://localhost:8080/checkNickname",
          {
            params: {
              nickname: this.nickname,
            },
          }
        );
        this.isCheckingNickname = false;

        if (response.status === 200) {
          const result = response.data;
          if (result.result) {
            this.isNicknameUsed = true;
            alert("사용 가능한 닉네임입니다.");
          } else {
            alert(result.message);
          }
        } else {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        alert("닉네임 중복 체크에 실패했습니다. 다시 시도해주세요.");
      }
    },
    async checkEmail() {
      try {
        if (!this.email) {
          alert("이메일을 입력해주세요.");
          return;
        }
        this.isCheckingEmail = true;
        const response = await axios.get(
          "http://localhost:8080/checkEmail",
          {
            params: {
              email: this.email,
            },
          }
        );
        this.isCheckingNickname = false;

        if (response.status === 200) {
          const result = response.data;
          console.log(result);
          if (result.result) {
            this.isEmailUsed = true;
            this.startTimer();
            alert("이메일을 확인해 주세요.");
            this.sendCode();
          } else {
            alert(result.message);
          }
        } else {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        alert("이메일 중복 체크에 실패했습니다. 다시 시도해주세요.");
      }
    },
    async sendCode() {
      await axios.post(
        "http://localhost:8080/email/auth/", {},
        {
          params: {
            email: this.email,
          },
        }
      );

    },
    async submitForm() {
      const data = {
        email: this.email,
          nickname: this.nickname,
          password: this.password,
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/user/new",data,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          alert("회원가입이 완료되었습니다.");
          this.$emit('closeModal');
        }
      } catch (error) {
        console.error('submitForm error:', error);
      }
    },
    handleModalClick(event) {
      // 모달 배경 클릭 시 모달 닫기
      if (event.target === this.$el) {
        this.$emit('closeModal');
      }
    },
    async checkEmailCode() {
      try {
        if (!this.code) {
          alert("코드를 입력해주세요.");
          return;
        }
        const response = await axios.post(
          "http://localhost:8080/emails/auth/verifications", {},
          {
            params: {
              email: this.email,
              authCode: this.code,
            }
          }
        );

        if (response.status === 200) {
          const result = response.data;
          if (result.message.indexOf('완료') >= 0) {
            alert("이메일이 확인 되었습니다.");
            this.emailCodeChecked = true;
            clearInterval(this.intervalId);
          } else {
            alert(result.message);
          }
        } else {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        alert("이메일 확인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  },
};
</script>

<style scoped>
.disable-button {
  width: 17%;
  height: 42px;
  padding: 5px;
  border-radius: 4px;
  border: none;
  background-color: #DDE6ED;
  cursor: default;
}

/* 모달 스타일 */
.modal-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  /* 추가된 부분 */
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
  margin-left: 9%;
  margin-bottom: 30px;
}

.input-field {
  margin-left: 9%;
  margin-right: 10%;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 80%;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.nickname-dupcheck-button {
  width: 17%;
  height: 42px;
  padding: 5px;
  border-radius: 4px;
  border: none;
  background-color: #FF4500;
  color: white;
  cursor: pointer;
}

.email-dupcheck-button {
  width: 17%;
  height: 42px;
  padding: 5px;
  border-radius: 4px;
  border: none;
  background-color: #FF4500;
  color: white;
  cursor: pointer;
}

.submit-button {
  background-color: #FF4500;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 40px;
  margin-left: 9%;
  margin-right: 9%;
  text-align: center;
}
</style>
