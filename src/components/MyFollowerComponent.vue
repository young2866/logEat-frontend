<template>
    <div class="my-component">
        <p>팔로워 수: {{ followers.length }}</p>
      </div>
  </template>
  
  <script>
  import axios from '../axios/index.js'; // Axios 인스턴스 경로에 맞게 조정
  
  export default {
    name: 'MyFollowerComponent',
    data() {
      return {
        followers: [],
      };
    },
    created() {
      this.fetchFollowers();
    },
    methods: {
      async fetchFollowers() {
        try {
        const token = localStorage.getItem('access_token');
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/myfollower`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        this.followers = response.data.result; // 백엔드 응답 구조에 맞게 조정
        })
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style>
  .follow-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 20px; /* 컴포넌트 사이의 간격 조정 */
  }
  
  .follow-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: #f9f9f9; /* 배경색 */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    width: 45%; /* 컴포넌트의 너비 */
    margin-bottom: 20px; /* 하단 마진 추가 */
  }
  
  .follow-component h2 {
    font-size: 1rem; /* 제목 크기 */
    color: #333; /* 제목 색상 */
    margin-bottom: 10px; /* 제목과 리스트 사이의 간격 */
  }
  
  .follow-component ul {
    list-style: none;
    padding: 0;
    text-align: center; /* 텍스트 중앙 정렬 */
  }
</style>