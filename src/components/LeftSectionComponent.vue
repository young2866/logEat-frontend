<template>
    <div id="left-parent">
        <div class="search-box">
            
            <div class="magnifier-icon">
                <img src="../assets/Magnifier.png" alt="Search" width="30" height="30">
                <div class="search-text">검색하기</div>
            </div>
            
        
            <div class="search-buttons">
                <button style="margin-left:5%;" class="side_button" @click="toggleSearchActive('user')" :class="{ 'active': isSearchActive === 'user' }" >   유저   </button>
                <button class="side_button" @click="toggleSearchActive('menu')" :class="{ 'active': isSearchActive === 'menu' }" >   제목   </button>
                <button style="margin-right:5%;" class="side_button" @click="toggleSearchActive('store')" :class="{ 'active': isSearchActive === 'store' }" >카테고리</button>
            </div>

            <div class="search-bar">
                <div class="input-container">
                  <input type="text" placeholder="유저의 아이디를 입력해주세요" />
                </div>
            </div>
        </div>
        <div class="likes-box">
            <div class="star-icon">
                <img src="../assets/star.png" alt="Likes" width="30" height="30">
                <div class="likes-text">좋아요를 가장 많이 받은 글</div>
            </div>
            

            <div class="likes-buttons">
                <button style="margin-left:5%;" v-if="week" class="side_button" :class="{ 'active': isLikeActive === 'week' }" @click="toggleLikeActive('week')" >
                    지난 주간
                </button>
                <button v-if="month" class="side_button"  :class="{ 'active': isLikeActive === 'month' }" @click="toggleLikeActive('month')">
                    지난 한달
                </button>
            </div>

            <div class="likes-content">
                <img src="../assets/logeat-default.png" alt="Default"  class="content-image">
                <div class="content-info">
                    <div class="content-title">눈물 젖은 초코파이</div>
                    <div>
                        <button class="content-tag">과자</button>
                        <button class="content-brand">오리온</button>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';

const week = ref(true); 
const month = ref(true);
const isSearchActive = ref(null);
const isLikeActive = ref(null);

const toggleSearchActive = (selection) => {
    isSearchActive.value = selection;
};

const toggleLikeActive = (selection) => {
    isLikeActive.value = selection;
};







</script>

<style lang="scss" scoped>
@import "../css/LeftStyle.css";


</style>
