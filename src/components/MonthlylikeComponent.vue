<template>
<div class="latest-posts">
    <div class="posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-content">{{ post.title }}</div>
        <div class="post-content">{{ post.category }}</div>
        <!-- 여기에 추가적인 포스트 정보를 표시할 수 있습니다 -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MonthlylikeComponent',
  data() {
    return {
      posts: [] // 서버로부터 받아온 포스트를 저장할 배열
    };
  },
  created() {
    this.fetchMonthlyLikedPosts();
  },
  methods: {
    fetchMonthlyLikedPosts() {
      axios.get(`${process.env.VUE_APP_API_BASE_URL}/post/like/month`)
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error('게시물을 불러오는 중 오류가 발생했습니다:', error);
        });
    }
  }
}
</script>