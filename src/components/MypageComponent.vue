<template>  
  <div class="mypage-container">
    <div class="profile-container">
      <div class="profile-pic-container">
        <img src="@/assets/test.jpeg" alt="Profile Picture" class="profile-pic">
      </div>
      <div class="profile-info">
        <h2 class="nickname">{{ userProfile.nickname }}</h2>
        <p class="introduction">{{ userProfile.introduce }}</p>
        <button class="edit-button" @click="editProfile">수정</button>
      </div>
    </div>

    <!-- Modal for editing profile -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 style="text-align: center;">프로필 수정</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="nickname">닉네임:</label>
            <input type="text" id="nickname" v-model="userProfile.nickname" @input="checkNicknameLength">
            <span v-if="nicknameTooLong" class="error-message">닉네임은 8글자로 제한됩니다.</span>
          </div>
          <div class="form-group">
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

export default {
  name: 'MyPage',
  data() {
    return {
    userProfile: {
      introduce:'',
      nickname:'',
    },
      isModalVisible: false,
      nicknameTooLong: false,
      introductionTooLong: false,
    };
  },
  methods: {
    editProfile() {
      this.isModalVisible = true;
    },
    closeModal() {
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
        console.log(response.data)
        this.userProfile = response.data.result;
      })
      .catch(error => {
        console.error("프로필 정보 불러오기 실패:", error);
        alert("프로필 정보를 불러올 수 없습니다.");
      });
      console.log(this.userProfile)
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
        this.fetchUserProfile(); // 업데이트 후 사용자 정보 재조회
      })
      .catch(error => {
        console.error("프로필 업데이트 실패:", error);
        alert("프로필 업데이트에 실패했습니다.");
      });
    },
    checkNicknameLength() {
    this.nicknameTooLong = this.userProfile?.nickname?.length > 8;
  },
  checkIntroductionLength() {
    this.introductionTooLong = this.userProfile?.introduce?.length > 31;
  },
  },
  watch: {
    'userProfile.nickname'() {
      this.checkNicknameLength();
    },
    'userProfile.introduce'() {
      this.checkIntroductionLength();
    },
  },
  mounted() {
    this.fetchUserProfile();
  }
}
</script>



<style scoped>
.mypage-container, .modal-content {
  font-family: 'Arial', sans-serif;
  color: #333;
  max-width: 500px; /* 모달과 프로필 페이지 너비 통일 */
  margin: 20px auto; /* 중앙 정렬 */
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-container, .form-group {
  text-align: center; /* 텍스트 중앙 정렬 */
  margin-bottom: 20px;
}

.profile-pic-container, .profile-pic {
  margin: auto; /* 프로필 사진 중앙 정렬 */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #f76c6c;
  object-fit: cover;
}

.nickname, .introduction, h2 {
  color: #f76c6c; /* 통일된 컬러 테마 */
}

.edit-button, button[type="submit"] {
  background-color: #f76c6c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
}

.close {
  color: #aaa;
  cursor: pointer;
}

.close:hover {
  color: black;
}

.error-message {
  color: red;
  font-size: 0.9em;
}

input[type="text"], textarea {
  width: calc(100% - 16px); /* 입력 필드 너비 조정 */
  padding: 8px;
  margin-top: 5px; /* 라벨과의 간격 */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group label {
  color: #333;
  font-weight: bold; /* 라벨 가독성 향상 */
}
</style>
