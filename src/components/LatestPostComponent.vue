<template>
  <div v-if="isModalPostDetailOpen" class="modal-container">
    <div class="like-share-buttons">
      <div
        style="width: 64px; height: 150px; padding-left: 8px; padding-top: 9px; padding-bottom: 9px; background: #F8F9FA; border-radius: 32px; border: 1px #F1F3F5 solid; flex-direction: column; justify-content: center; align-items: center; display: inline-flex">
        <div @click="likeClick(selectedPostId)"
          style="cursor: pointer; align-self: stretch; height: 48px; width: 48px; padding: 3px; background: white; border-radius: 24px; border: 1px #DEE2E6 solid; justify-content: center; align-items: center; display: inline-flex">
          <div
            style="width: 24px; height: 24px; padding-top: 1px; padding-bottom: 1px; justify-content: center; align-items: center; display: flex">
            <img style="width: 30px;" src="../assets/Full_Heart.png">
          </div>
        </div>
        <div
          style="margin-right:10px; padding-top: 8px; padding-bottom: 8px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
          {{ postlikeCount }}
        </div>
        <div @click="followClick(selectedPostUserNickname)"
          style="cursor: pointer; align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
          <div
            style="align-self: stretch; height: 48px; width: 48px; padding: 3px; background: white; border-radius: 24px; border: 1px #DEE2E6 solid; justify-content: center; align-items: center; display: inline-flex">
            <div style="width: 20px; height: 20px; justify-content: center; align-items: center; display: flex">
              <img style="width: 30px;" src="../assets/follow.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <!-- <PostDetail v-if="isModalPostDetailOpen" :id="selectedPostId"></PostDetail> -->
        <PostDetail :id="selectedPostId" @closePostDetailModal="closePostDetailModal" />
      </div>
    </div>
  </div>
  <div class="latest-posts">
    <!-- <div class="posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-author">{{ post.userNickname }}</div>
        <div class="post-content">{{ post.title }}</div>
      </div>
    </div> -->
    <div v-for="post in posts" :key="post.id">
      <div class="posts" style="cursor: pointer;"
        @click="openPostDetailModal(post.id, post.likeCount, post.userNickname)">

        <img src="../assets/Anonymous.png" v-if="post.profileImagePath === null || post.profileImagePath === ''"
          alt="Profile" width="40" height="40" class="post-profile" />

        <!-- thumbnailPath 값이 'thumbnailPath insert'가 아닐 때 표시될 부분 -->
        <img :src="post.profileImagePath" v-else class="post-author-img" />
        <div class="post-detail">
          <div class="post-author">{{ post.userNickname }}</div>
          <div class="post-content">{{ post.title }}</div>
        </div>

        <!-- 여기에 추가적인 포스트 정보를 표시할 수 있습니다 -->
      </div>
    </div>
    <div class="switch-buttons">
      <button @click="goToPreviousPage" class="switch-button"> &lt; </button>
      <button @click="goToNextPage" class="switch-button"> &gt; </button>
    </div>
  </div>
</template>
<script>
import axiosInstance from '../axios/index.js'
import PostDetail from './PostDetail.vue';

export default {
  components: {
    PostDetail,
  },
  name: 'LatestPostComponent',
  data() {
    return {
      posts: [], // 서버로부터 받아온 포스트를 저장할 배열
      currentPage: 0,
      followingSize: 5,
      postsPerPage: 5,
      selectedPostId: null,
      isModalPostDetailOpen: false,
      postlikeCount: 0,
      selectedPostUserNickname: '',

    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.posts.slice(start, end);
    }
  },
  created() {
    this.fetchLatestPosts();
  },
  methods: {
    async likeClick(selectedPostId){
            try {
                const response = await axiosInstance.post(`${process.env.VUE_APP_API_BASE_URL}/post/${selectedPostId}/like`);
                const message = response.data.message;
                if(message==="cancel"){
                    alert("좋아요를 취소하셨습니다.");
                }else if(message==="success"){
                    alert("좋아요를 눌렀습니다.");
                }
            }catch(error){
                console.log(error);
            }
        },
        async followClick(selectedPostUserNickname){
            try {
                const response = await axiosInstance.post(`${process.env.VUE_APP_API_BASE_URL}/follow/${selectedPostUserNickname}`);
                const message = response.data.message;
                if(message==="cancel"){
                    alert(selectedPostUserNickname + "님 팔로우를 취소하셨습니다.");
                }else if(message==="success"){
                    alert(selectedPostUserNickname + "님 팔로우를 하셨습니다.");
                }
            }catch(error){
                console.log(error);
            }
        },
    openPostDetailModal(id, likeCount, userNickname) {
      this.selectedPostId = id;
      this.postlikeCount = likeCount;
      this.selectedPostUserNickname = userNickname;
      this.isModalPostDetailOpen = !this.isModalPostDetailOpen;
    },
    fetchLatestPosts() {
      // 서버의 해당 엔드포인트로부터 데이터를 요청합니다
      const params = {
        // page: 0,
        // size : this.followingSize
        page: this.currentPage - 1, // 페이지 인덱싱을 0부터 시작하기 때문에 -1을 해줍니다.
        size: this.postsPerPage
      }
      axiosInstance.get(`${process.env.VUE_APP_API_BASE_URL}/post/following/latest-post`, { params })
        .then(response => {
          // console.log(response.data)
          this.posts = response.data.content;
        })
        .catch(error => {
          console.error("최근 글을 불러오는데 실패했습니다:", error);
        });
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchLatestPosts();
      }
    },
    goToNextPage() {
      // 여기서는 전체 포스트 수를 알 수 없으므로 예시 코드에는 이 조건을 추가하지 않았습니다.
      this.currentPage++;
      this.fetchLatestPosts();
    },
    closePostDetailModal() {
      this.isModalPostDetailOpen = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.like-share-buttons {
  margin: 30px;
}

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
  height: 90%;
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

@import "../css/style.css";
@import "../css/RightStyle.css";</style>