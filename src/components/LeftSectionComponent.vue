<template>
    <!-- 전 -->
    <!-- <div style="width: 354px; height: 968px; left: 0px; top: 30px; position: absolute; background: white">
        <div style="width: 332px; height: 253px; left: 22px; top: 29px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
            <div>
                <div style="width: 5px; height: 5px; left: 40px; top: 40px; position: absolute">
                    <img src="../assets/Magnifier.png" width="30px" height="30px" >
                </div>
                <div style="width: 55.51px; height: 28px; left: 74px; top: 44.50px; position: absolute; color: #555555; font-size: 15px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word">검색하기</div>
            </div>
            
              
        </div>
    </div>
    <div style="width: 332px; height: 640.50px; left: 22px; top: 320px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
        <div>
            <div style="width: 19.65px; height: 18.74px; left: 40.17px; top: 37.69px; position: absolute;">
                <img src="../assets/star.png" width="30px" height="30px">
            </div>
            <div style="width: 180px; height: 28px; left: 74px; top: 41px; position: absolute; color: #555555; font-size: 15px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word">좋아요를 가장 많이 받은 글</div>
        </div>
        
        
        
        <div style="width: 186.11px; height: 24.50px; left: 95px; top: 157px; position: absolute">
            <div style="width: 186.31px; height: 16px; left: 0px; top: 4px; position: absolute; color: #555555; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 24.50px; word-wrap: break-word">눈물 젖은 초코파이</div>
        </div>
        <div style="width: 33.94px; height: 20px; left: 95px; top: 193.50px; position: absolute; background: rgba(112, 115, 124, 0.08); border-radius: 4px; overflow: hidden">
            <div style="width: 21.94px; height: 18px; left: 6px; top: 1px; position: absolute">
                <div style="width: 22.14px; height: 13px; left: 0px; top: 2px; position: absolute; text-align: center; color: #888888; font-size: 10.66px; font-family: Inter; font-weight: 700; line-height: 18px; letter-spacing: 0.25px; word-wrap: break-word">과자</div>
            </div>
        </div>
        <div style="width: 46.50px; height: 20px; left: 134.94px; top: 193.50px; position: absolute; background: rgba(112, 115, 124, 0.08); border-radius: 4px; overflow: hidden">
        <div style="width: 34.50px; height: 18px; left: 6px; top: 1px; position: absolute">
            <div style="width: 34.70px; height: 13px; left: 0px; top: 2px; position: absolute; text-align: center; color: #888888; font-size: 10.66px; font-family: Inter; font-weight: 700; line-height: 18px; letter-spacing: 0.25px; word-wrap: break-word">오리온</div>
        </div>
        </div>
        <img style="width: 32px; height: 32px; left: 43px; top: 170px; position: absolute" src="https://via.placeholder.com/32x32" />
    </div> -->

    <!-- 후 -->
    <div id="left-parent">
        <div class="search-box">
            
            <div class="magnifier-icon">
                <img src="../assets/Magnifier.png" alt="Search" width="30" height="30">
            </div>
            <div class="search-text">검색하기</div>
        
            <div class="search-buttons">
                <button style="margin-left:5%;" class="side_button" @click="toggleSearchActive('user')" :class="{ 'active': isSearchActive === 'user' }" >유저 검색</button>
                <button class="side_button" @click="toggleSearchActive('menu')" :class="{ 'active': isSearchActive === 'menu' }" >메뉴 검색</button>
                <button style="margin-right:5%;" class="side_button" @click="toggleSearchActive('store')" :class="{ 'active': isSearchActive === 'store' }" >가게 검색</button>
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
            </div>
            <div class="likes-text">좋아요를 가장 많이 받은 글</div>
            <div class="likes-buttons">
              <button class="side_button" :class="{ 'active': isLikeActive === 'week' }" @click="setLikeActive('week')">
                지난 주간
              </button>
              <button class="side_button" :class="{ 'active': isLikeActive === 'month' }" @click="setLikeActive('month')">
                지난 한달
              </button>
            </div>
            <div v-if="isLikeActive">
              <WeeklyLikeComponent v-if="isLikeActive === 'week'"></WeeklyLikeComponent>
              <MonthlylikeComponent v-if="isLikeActive === 'month'"></MonthlyLikeComponent> 
            </div>

            <div class="likes-content">
                <img src="https://via.placeholder.com/32x32" alt="Product" class="content-image">
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
import WeeklyLikeComponent from './WeeklyLikeComponent.vue';
import MonthlylikeComponent from './MonthlylikeComponent.vue';

const isLikeActive = ref(null); // 'week', 'month', 또는 null을 저장

const setLikeActive = (filterType) => {
  isLikeActive.value = filterType;
};
</script>

<style lang="scss" scoped>
.search-bar {
    width: 274px; 
    height: 38px; 
    left: 34px; 
    top: 176px; 
    position: absolute; 
    background: #F1F3F5; 
    border-radius: 12px
    /* 추가 스타일 */
  }
  
  .input-container {
    width: 220px; 
    height: 16px; 
    left: 13px; 
    top: 11px; 
    position: absolute
    /* 추가 스타일 */
  }
  
  input {
    width: 200px; 
    height: 16px; 
    left: 0px; 
    top: 0px; 
    position: absolute; 
    background-color: #F1F3F5; 
    font-size: 13.12px; 
    font-family: Inter; 
    font-weight: 400; 
    word-wrap: break-word;
    border: none;

  }

    .side_button{
        background: white;

        margin-top: 100px;
        padding: 5px;
        border-radius: 8px;
        width: 95.92px; 
        height: 34px; 
        left: 37px; 
        top: 93px; 

        cursor: pointer;
 
        font-family: Inter;
        border: none;
    }
    .side_button:hover {
        background-color: #EAEBEC;
     }
    .active {
        background-color: #FF4500;
        color: white
    }
</style>

<style scoped>
/* left-parent의 디자인 */
.search-box, .likes-box {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #EAEBEC;
    margin: 20px;
    padding: 20px;
    position: relative;
}

.magnifier-icon, .star-icon {
    /* position: absolute; 제거 */
    float: left; /* 아이콘을 왼쪽으로 정렬 */
    margin-right: 10px; /* 텍스트와의 간격 */
}

.search-text, .likes-text {
    /* position: absolute; 제거 */
    display: inline-block; /* 인라인 블록 요소로 변경 */
    vertical-align: middle; /* 수직 중앙 정렬 */
    margin: 0 0 20px 10px; /* 여백 조정 */
}

.search-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    /* top, left 스타일 제거 */
}
.likes-buttons {
    display: flex;
    justify-content: flex-start; /* 왼쪽으로 정렬 */
    margin-top: 20px;
}

.side_button {
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px 10px;
    margin: 0 0 20px 10px;
}

.side_button.active {
    background-color: #ddd;
}

.search-bar {
    clear: both; /* 이전 float 요소 클리어 */
    margin-top: 20px;
}

.search-input {
    width: calc(100% - 20px); /* 테두리를 고려한 너비 조정 */
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.likes-content {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
}

.content-title, .content-tag, .content-brand, .content-image {
    margin-right: 10px; /* 요소들 사이의 간격 */
    margin-bottom: 0;
}
.content-tag, .content-brand {
    background-color: #f0f0f0; /* 버튼 배경 색 */
    border: none; /* 테두리 제거 */
    color: #555; /* 텍스트 색상 */
    padding: 5px 10px; /* 패딩 */
    margin-top: 5px; /* 상단 여백 */
    border-radius: 4px; /* 모서리 둥글게 */
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
    font-size: 12px; /* 폰트 크기 */
}
.content-image {
    width: 32px; /* 이미지 크기 조정 */
    height: 32px;
    margin-right: 10px;
    
}
.content-info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
</style>