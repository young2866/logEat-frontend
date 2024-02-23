<template>
  <div>
    <span class="close" @click="closemypageModal">&times;</span>
    <div class="profile-container">
      <div class="profile-pic-container" @click="triggerFileInput">
        <img v-if="userProfile.imageUrl === null" src="../assets/Anonymous.png" alt="Profile Picture" class="profile-pic" />
        <img v-if="userProfile.imageUrl!=null" :src="userProfile.imageUrl" alt="Profile Picture" class="profile-pic" />
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
      </div>
      <div class="profile-info">
        <h2 class="nickname">{{ userProfile.nickname }}</h2>
        <p class="introduction">{{ userProfile.introduce }}</p>
        <button class="edit-button" @click="editProfile">수정</button>
      </div>
      <div class="follow-container">
        <div class="follow-component">
          <MyFollowerComponent></MyFollowerComponent>
        </div>
        <div class="follow-component">
          <MyFollowingComponent></MyFollowingComponent>
        </div>
      </div>
    </div>

    <!-- Modal for editing profile -->
    <div v-if="isModalVisible" class="modal">
      <div class="edit-modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 style="text-align: center;">프로필 수정</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="nickname">닉네임:</label>
            <input type="text" id="nickname" v-model="userProfile.nickname" @input="checkNicknameLength">
            <span v-if="nicknameTooLong" class="error-message">닉네임은 8글자로 제한됩니다.</span>
          </div>
          <div class="form-group" style="padding-bottom: 10px">
            <label for="introduction">자기소개:</label>
            <textarea id="introduction" v-model="userProfile.introduce" @input="checkIntroductionLength"></textarea>
            <span v-if="introductionTooLong" class="error-message">자기소개는 31글자로 제한됩니다.</span>
          </div>
          <button type="submit" :disabled="nicknameTooLong || introductionTooLong">변경 사항 저장</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import axiosInstance from '../axios/index.js';
import MyFollowingComponent from './MyFollowingComponent.vue';
import MyFollowerComponent from './MyFollowerComponent.vue';
export default {
  components:{
        MyFollowerComponent,
        MyFollowingComponent,
    },
  name: 'MyPage',
  data() {
    return {
      userProfile: {
        introduce: '',
        nickname: '',
      },
      isModalVisible: false,
      nicknameTooLong: false,
      introductionTooLong: false,
    };
  },
  methods: {
    closemypageModal(){
      this.$emit('closemypageModal');
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('upload', file);
      try {
        const response = await axiosInstance.post(`${process.env.VUE_APP_API_BASE_URL}/user/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const data = response.data;
        if (data.uploaded) {
          this.userProfile.imageUrl = data.url;
          alert("프로필사진이 변경됐습니다");
        } else {
          console.error(data.error.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 파일을 FormData에 추가하고 서버로 업로드하는 로직을 추가하세요.

    editProfile() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.fetchUserProfile();
      this.isModalVisible = false;
    },
    fetchUserProfile() {
      const token = localStorage.getItem('access_token');
      axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/mypage`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.userProfile = response.data.result;
        })
        .catch(error => {
          console.error("프로필 정보 불러오기 실패:", error);
          alert("프로필 정보를 불러올 수 없습니다.");
        });
    },
    updateProfile() {
      const token = localStorage.getItem('access_token');
      axios.patch(`${process.env.VUE_APP_API_BASE_URL}/user/update`, this.userProfile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          alert("프로필이 업데이트 되었습니다!");
          this.closeModal();
          this.fetchUserProfile();
        })
        .catch(error => {
          console.error("프로필 업데이트 실패:", error);
          alert("프로필 업데이트에 실패했습니다.");
        });
    },
    checkNicknameLength() {
      this.nicknameTooLong = this.userProfile.nickname.length > 8;
    },
    checkIntroductionLength() {
      this.introductionTooLong = this.userProfile.introduce.length > 31;
    },
  },
  mounted() {
    this.fetchUserProfile();
  }
}
</script>

<style scoped>
.mypage-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin: 0 auto;
  /* 중앙 정렬 */
  padding: 15px;
  /* 내부 패딩 유지 */
  background: #fff;
  border-radius: 10px;
  /* 모달 스타일에 맞춰서 유지 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 모달 스타일에 맞춰서 유지 */
}

.profile-container {
  text-align: center;
  /* 텍스트 중앙 정렬 */
  margin-bottom: 20px;
  height: 400px;
  margin-top: 0px;
  padding-top: 15px;
  width: 370px;
}

.profile-pic-container,
.profile-pic {
  margin: auto;
  /* 프로필 사진 중앙 정렬 */
  width: 100px;
  /* 사진 크기 유지 */
  height: 100px;
  /* 사진 크기 유지 */
  border-radius: 50%;
  /* 원형 사진 유지 */
  /* 테두리 색상 유지 */
  object-fit: cover;
  /* 이미지 비율 유지 */
}

.nickname,
.introduction,
h2 {
  color: #f76c6c;
  /* 통일된 컬러 테마 유지 */
}

.edit-button,
button[type="submit"] {
  background-color: #f76c6c;
  /* 버튼 배경 색상 */
  color: white;
  /* 버튼 글자 색상 */
  padding: 10px 20px;
  /* 버튼 패딩 */
  border: none;
  /* 버튼 테두리 제거 */
  border-radius: 5px;
  /* 버튼 둥근 모서리 */
  cursor: pointer;
  /* 클릭 가능한 커서 모양 */
}

.edit-modal-content {
  width: 370px;
  background: white;
  padding-left: 10px;
  padding-right: 10px;
  padding: 10px;
  width: 60%;
  /* 너비를 줄임 */
  max-width: 370px;
  /* 최대 너비 조정 */
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* 반투명 배경 */
}

.close:hover {
  color: black;
  /* 닫기 버튼 호버 색상 */
}

.error-message {
  color: red;
  /* 에러 메시지 색상 */
  font-size: 0.9em;
  /* 에러 메시지 글자 크기 */
}

input[type="text"],
textarea {
  width: calc(100% - 16px);
  /* 입력 필드 너비 조정 */
  padding: 8px;
  /* 입력 필드 패딩 */
  margin-top: 5px;
  /* 입력 필드와 라벨 사이의 마진 */
  border: 1px solid #ccc;
  /* 입력 필드 테두리 */
  border-radius: 4px;
  /* 입력 필드 둥근 모서리 */
}

.form-group label {
  color: #333;
  /* 라벨 색상 */
  font-weight: bold;
  /* 라벨 굵기 */
}
</style>

