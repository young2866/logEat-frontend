<template>
  <div class="latest-posts">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="likes-content">
        <img src="https://via.placeholder.com/32x32" alt="Product" class="content-image">
        <div class="content-info">
            <div class="content-title">{{ post.title }}</div>
            <div>
              <div class="content-tag">{{ post.category }}</div>
            </div>    
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WeeklyLikeComponent',
  data() {
    return {
      posts: [] // 서버로부터 받아온 포스트를 저장할 배열
    };
  },
  created() {
    this.fetchWeeklyLikedPosts();
  },
  methods: {
    async fetchWeeklyLikedPosts() {
      await axios.get(`${process.env.VUE_APP_API_BASE_URL}/post/like/weeks`)
        .then(response => {
          console.log(response.data);
          this.posts = response.data;
        })
        .catch(error => {
          console.error('게시물을 불러오는 중 오류가 발생했습니다:', error);
        });
    }
  }
}
</script>