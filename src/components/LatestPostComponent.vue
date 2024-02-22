<template>
  <div class="latest-posts">
    <div class="posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-author">{{ post.userNickname }}</div>
        <div class="post-content">{{ post.title }}</div>
        <!-- 여기에 추가적인 포스트 정보를 표시할 수 있습니다 -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LatestPostComponent',
  data() {
    return {
      posts: [] // 서버로부터 받아온 포스트를 저장할 배열
    };
  },
  created() {
    this.fetchLatestPosts();
  },
  methods: {
    fetchLatestPosts() {
      // 서버의 해당 엔드포인트로부터 데이터를 요청합니다
      const token = localStorage.getItem('access_token');
      axios.get(`${process.env.VUE_APP_API_BASE_URL}/post/following/latest-post`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
            console.log(response.data)
          this.posts = response.data.content;
        })
        .catch(error => {
          console.error("최근 글을 불러오는데 실패했습니다:", error);
        });
    }
  }
}
</script>