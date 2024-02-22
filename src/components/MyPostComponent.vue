<template>
  <div v-if="isModalPostDetailOpen" class="modal-container">
      <div class="modal-content" @click.stop>
        <div class="modal-inner">
          <!-- <PostDetail v-if="isModalPostDetailOpen" :id="selectedPostId"></PostDetail> -->
          <PostDetail :id="selectedPostId" @closePostDetailModal="closePostDetailModal"/>
        </div>
      </div>
    </div>
    <div v-if="isModalPostUpdateOpen" class="modal-container">
      <div class="modal-content" @click.stop>
        <div class="modal-inner">
          <!-- <PostDetail v-if="isModalPostDetailOpen" :id="selectedPostId"></PostDetail> -->
          <PostUpdate v-bind:updatePost="updatePost" @closePostUpdateModal="closePostUpdateModal" @closeModal="closeModal"/>
        </div>
      </div>
    </div>
  <div class="modal-header">
     <span class="close" @click="closemypostModal">&times;</span>
   </div>
  <div>
      <div v-if="userPosts.length > 0">
          <h2>내 게시물</h2>
          <div class="posts-container">
            <div v-for="post in userPosts" :key="post.id" class="post-item">
              <img v-if="post.thumbnailPath" :src="post.thumbnailPath" alt="게시물 이미지" class="post-thumbnail" @click="openPostDetailModal(post.id)">
              <img v-else src="../assets/logeat-default.png" alt="Product Image" class="post-image" @click="openPostDetailModal(post.id)">
              <div class="post-info">
                <h3>{{ post.title }}</h3>
                <p>좋아요: {{ post.likeCount }}</p>
                <p>작성일: {{ post.createdTime }}</p>
                <button style="z-index: 500;" class="edit-button" @click="openPostUpdateModal(post.id)">수정</button>
              </div>
            </div>
          </div>
        </div>
    <div v-else>
      <p>게시물이 없습니다.</p>
    </div>
    </div>
</template>
<script>
import axiosInstance from '../axios/index.js';
import PostDetail from './PostDetail.vue';
import PostUpdate from './PostUpdate.vue';
//   import PostDetail from './PostDetail.vue';
export default {
  components:{
      PostDetail,PostUpdate
  },
  name: 'MyPost',
data() {
  return {
    updatePost : '',
    userProfile: {
        id:'',
        thumbnailPath: '',
        title: '',
        userNickname: '',
        createdTime: '',
        likeCount: '',
    },
    userPosts: [], // 사용자 게시물을 저장할 배열 추가
    isModalVisible: false,
    nicknameTooLong: false,
    introductionTooLong: false,
    selectedPostId:null,
    isModalPostDetailOpen:false,
    isModalPostUpdateOpen:false,
    post : null,
  };
},

  methods: {
    openPostUpdateModal(id){
        axiosInstance.get('/post/'+id+'/detail').then(response => {
          this.updatePost = response.data
          console.log(this.updatePost)
          this.isModalPostUpdateOpen = !this.isModalPostUpdateOpen;
        });
      },
      openPostDetailModal(id){
          this.selectedPostId = id;
          this.isModalPostDetailOpen = !this.isModalPostDetailOpen;
      },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.imagePreview = URL.createObjectURL(file);
      // 파일을 FormData에 추가하고 서버로 업로드하는 로직을 추가하세요.
    },
   closemypostModal() {
      this.$emit('closemypostModal');
    },
    editProfile() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalPostUpdateOpen = false;
    },
    closePostDetailModal() {
          console.log("closePostDetailModal() 실행!!!")
          this.isModalPostDetailOpen = false;
      },
      closePostUpdateModal() {
          console.log("closePostDetailModal() 실행!!!")
          this.isModalPostUpdateOpen = false;
      },
    fetchUserPost() {
    axiosInstance.get(`${process.env.VUE_APP_API_BASE_URL}/post/mypost`)
    .then(response => {
      // 서버로부터 받은 게시물 데이터를 userPosts 배열에 저장
      console.log(response.data.content)
      this.userPosts = response.data.content; // response.data.content 가정; 실제 응답 구조에 따라 조정 필요
    })
    .catch(error => {
      console.error("글을 불러 올 수 없습니다:", error);
      alert("글을 불러 올 수 없습니다.");
    });
  },
},
mounted() {
  this.fetchUserPost();
}
}
</script>
<style scoped>
.modal-container {
 position: fixed;
 z-index: 1000;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 background: rgba(0, 0, 0, 0.5);
}
.modal-content {
 position: relative;
 background: white;
 padding-top: 60px; /* "닫기" 버튼 위쪽의 공간을 확보합니다 */
 padding-bottom: 20px; /* 모달 아래쪽 패딩 */
 padding-left: 20px; /* 모달 왼쪽 패딩 */
 padding-right: 20px; /* 모달 오른쪽 패딩 */
 border-radius: 8px;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 width: 50%; /* 또는 적절한 너비 설정 */
 height: 90%;
 max-width: 600px; /* 최대 너비 설정 */
 text-align: center; /* 텍스트 중앙 정렬 */
 overflow-y: auto; /* 세로 스크롤바 설정 */
 max-height: 80vh; /* 모달 창의 최대 높이 설정 */
}
.close {
  top: 5px; /* 상단으로부터 5px */
  left: 10px; /* 좌측으로부터 10px */
  color: #aaa;
  cursor: pointer;
  font-size: 24px;
}
.close:hover {
 color: black;
}
/* 게시물 컨테이너 스타일 */
.posts-container {
 display: flex;
 flex-direction: column;
 gap: 10px;
}
/* 개별 게시물 아이템 스타일 */
.post-item {
 background: #F9F9F9;
 border-radius: 10px;
 overflow: hidden;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 padding: 15px;
 align-items: center;
}
/* 게시물 이미지 스타일 */
.post-thumbnail {
 width: 100%; /* 이미지 너비를 게시물 컨테이너에 맞춥니다 */
 height: auto; /* 이미지 높이를 자동으로 설정합니다 */
 object-fit: cover;
 border-radius: 8px; /* 이미지의 테두리 둥글게 처리 */
}
/* 게시물 정보 스타일 */
.post-info h3, .post-info p {
 margin: 10px 0;
 text-align: left; /* 텍스트를 왼쪽 정렬합니다 */
}
/* 버튼 스타일 */
button[type="submit"], .edit-button {
 background-color: #F76C6C;
 color: white;
 padding: 10px 20px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 margin-top: 20px;
}
/* 입력 필드 스타일 */
input[type="text"], textarea {
 width: 100%; /* 입력 필드 너비를 조정합니다 */
 padding: 10px;
 margin-top: 5px;
 border: 1px solid #ccc;
 border-radius: 4px;
}
</style>