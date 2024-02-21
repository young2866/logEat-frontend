<script setup>

// import { ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

// const week = ref(true)
// const month = ref(true)

// const isSearchActive = ref(null);
// const isLikeActive = ref(null);

// const toggleSearchActive = (selection) => {
//     isSearchActive.value = selection;
// };

// const toggleLikeActive = (selection) => {
//     isLikeActive.value = selection;
// };


</script>
<template>
    <HeaderComponent />
    <div id="main-parent">

        <!-- 왼쪽 박스 - 검색/좋아요 받은 피드-->
        <div id="left-parent">
            <div class="search-box">
                
                <div class="magnifier-icon">
                    <img src="../assets/Magnifier.png" alt="Search" width="30" height="30">
                </div>
                <div class="search-text">검색하기</div>
                

                <!-- <button @click="toggleSearchActive('user')" :class="{ 'active': isSearchActive === 'user' }" style="width: 76.33px; height: 14px; left: 57px; top: 110px; position: absolute; color: #666666; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 14px; word-wrap: break-word">
                    유저 검색
                </button>
                
                <button @click="toggleSearchActive('menu')" :class="{ 'active': isSearchActive === 'menu' }" style="width: 76.33px; height: 14px; left: 146px; top: 110px; position: absolute; color: #666666; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 14px; word-wrap: break-word">
                    메뉴 검색
                </button>
                
                <button @click="toggleSearchActive('store')" :class="{ 'active': isSearchActive === 'store' }" style="width: 76.33px; height: 14px; left: 234px; top: 110px; position: absolute; color: #666666; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 14px; word-wrap: break-word">
                    가게 검색
                </button> -->
            

                <div class="search-buttons">
                    <button class="side_button" data-search-type="user">유저 검색</button>
                    <button class="side_button" data-search-type="menu">메뉴 검색</button>
                    <button class="side_button" data-search-type="store">가게 검색</button>
                </div>

                <div class="search-bar">
                    <input type="text" placeholder="유저의 아이디를 입력해주세요" class="search-input">
                </div>
            </div>
            <div class="likes-box">
                <div class="star-icon">
                    <img src="../assets/star.png" alt="Likes" width="30" height="30">
                </div>
                <div class="likes-text">좋아요를 가장 많이 받은 글</div>

                <div class="likes-buttons">
                    <button class="side_button" data-like-type="week">지난 주간</button>
                    <button class="side_button" data-like-type="month">지난 한달</button>
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

        <!-- 가운데 박스 - 피드 -->
        <div id="middle-parent">
            <div class="content-box">
                <!-- 첫 번째 post -->
                <div class="post">
                    <img src="https://via.placeholder.com/247x225" class="post-image" alt="Product Image" />
                    <div class="post-info">
                        <img src="https://via.placeholder.com/21x21" class="post-icon" alt="Icon" />
                        <div class="post-author">장은지</div>
                    </div>
                    <div class="post-description">에너지 바 2개</div>
                    <div class="post-details">
                        <div class="post-location">플레이 데이타 동작점</div>
                        <div class="post-score">
                            <img src="../assets/heart-LikePost.png" alt="LikePost" width="15" height="15">
                            99
                        </div>
                    </div>

                </div>

                <!-- 두 번째 post -->
                <div class="post">
                    <img src="https://via.placeholder.com/247x225" class="post-image" alt="Product Image" />
                    <div class="post-info">
                        <img src="https://via.placeholder.com/21x21" class="post-icon" alt="Icon" />
                        <div class="post-author">장은지</div>
                    </div>
                    <div class="post-description">잘못산 양배추 사과 즙</div>
                    <div class="post-details">
                        <div class="post-location">플레이 데이타 동작점</div>
                        <div class="post-score">
                            <img src="../assets/heart-LikePost.png" alt="LikePost" width="15" height="15">
                            12
                        </div>
                    </div>
                </div>
                <!-- 세 번째 post -->
                <div class="post">
                    <img src="https://via.placeholder.com/247x225" class="post-image" alt="Product Image" />
                    <div class="post-info">
                        <img src="https://via.placeholder.com/21x21" class="post-icon" alt="Icon" />
                        <div class="post-author">장은지</div>
                    </div>
                    <div class="post-description">아침 사과가 몸에 좋대요</div>
                    <div class="post-details">
                        <div class="post-location">플레이 데이타 동작점</div>
                        <div class="post-score">
                            <img src="../assets/heart-LikePost.png" alt="LikePost" width="15" height="15">
                            27
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- 오른쪽 박스- 최근업데이트 된 프로필 -->
        <div id="right-parent">
            <div class="profile-updates-box">
                <div class="updates-title">최근 업데이트 된 프로필</div>
                <div class="switch-buttons">
                    <div class="switch-left"></div>
                    <div class="switch-right"></div>
                </div>
                <!-- 추가적인 프로필 업데이트 내용 -->
            </div>
            <!-- right-parent 내에 추가적인 요소나 섹션이 필요할 경우 여기에 포함 -->
        </div>
    </div>
</template>
  
<style>
@import "../css/style.css";
</style>

