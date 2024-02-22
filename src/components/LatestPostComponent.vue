<template>
<div v-if="isModalPostDetailOpen" class="modal-container">
        <div class="modal-content" @click.stop>
          <div class="modal-inner">
            <!-- <PostDetail v-if="isModalPostDetailOpen" :id="selectedPostId"></PostDetail> -->
            <PostDetail :id="selectedPostId" @closePostDetailModal="closePostDetailModal"/>
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
    <div v-for="post in posts" :key="post.id" >  
      <div class="posts" style="cursor: pointer;" @click="openPostDetailModal(post.id)">
      
        <img src="../assets/Anonymous.png"  v-if="post.profileImagePath === null  || post.profileImagePath === '' " alt="Profile" width="40" height="40" class="post-profile" />
          
        <!-- thumbnailPath 값이 'thumbnailPath insert'가 아닐 때 표시될 부분 -->
        <img :src="post.profileImagePath" v-else class="post-author-img"/>
        <div class="post-detail">
          <div class="post-author">{{ post.userNickname }}</div>
          <div class="post-content">{{ post.title }}</div>
        </div>
        
        <!-- 여기에 추가적인 포스트 정보를 표시할 수 있습니다 -->
      </div>
    </div>
    <div class="switch-buttons">
      <button @click="goToPreviousPage" class="switch-button" > &lt; </button>
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
    openPostDetailModal(id) {
            this.selectedPostId = id;
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
      axiosInstance.get(`${process.env.VUE_APP_API_BASE_URL}/post/following/latest-post`,{params})
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
@import "../css/style.css";
@import "../css/RightStyle.css";
</style>