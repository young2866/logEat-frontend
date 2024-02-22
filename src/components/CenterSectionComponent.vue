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
                <div style="margin-right:10px; padding-top: 8px; padding-bottom: 8px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
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


    <div id="middle-parent" :style="isModalPostDetailOpen ? 'overflow: hidden; height: 30vh;' : ''" >
    <!-- 위에꺼 스타일은 모달을 열면 고정되게 하기위해 한거 -->
        <div class="content-box" v-if="this.isSearch === false">
            <div class="post-design" v-for="post in postList" :key="post.id" @click="openPostDetailModal(post.id, post.likeCount, post.userNickname)">
                <img :src="post.thumbnailPath" v-if="post.thumbnailPath != ''" class="post-image" alt="Product Image" />
                <img src="../assets/logeat-default.png" v-if="post.thumbnailPath === null || post.thumbnailPath === ''"
                    class="post-image" alt="Product Image" />
                <div class="post-info">
                    <img src="../assets/Anonymous.png" v-if="post.profileImagePath === null" class="post-icon" alt="Icon" />
                    <img :src="post.profileImagePath" v-if="post.profileImagePath != null" class="post-icon" alt="Icon" />
                    <div class="post-author">{{ post.userNickname }}</div>
                </div>
                <div class="post-description">{{ post.title }}</div>
                <div class="post-details">
                    <div class="post-location">{{ post.location }}</div>
                    <div class="post-score">
                        <img src="../assets/heart-LikePost.png" alt="LikePost" width="15" height="15">
                        {{ post.likeCount }}
                    </div>
                </div>
            </div>
        </div>

        <div class="content-box">
            <!-- 검색창에서 받아온 post -->
            <div class="post-design" v-for="post in this.responseValue.content" :key="post.id"
                @click="openPostDetailModal(post.id)">
                <img :src="post.thumbnailPath" v-if="post.thumbnailPath != ''" class="post-image" alt="Product Image" />
                <img src="../assets/logeat-default.png" v-if="post.thumbnailPath === null || post.thumbnailPath === ''"
                    class="post-image" alt="Product Image" />
                <div class="post-info">
                    <img src="../assets/Anonymous.png" v-if="post.profileImagePath === null" class="post-icon" alt="Icon" />
                    <img src={{post.profileImagePath}} v-if="post.profileImagePath != null" class="post-icon" alt="Icon" />
                    <div class="post-author">{{ post.userNickname }}</div>
                </div>
                <div class="post-description">{{ post.title }}</div>
                <div class="post-details">
                    <div class="post-location">{{ post.location }}</div>
                    <div class="post-score">
                        <img src="../assets/heart-LikePost.png" alt="LikePost" width="15" height="15">
                        {{ post.likeCount }}
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import axios from 'axios';
import PostDetail from './PostDetail.vue';
import axiosInstance from '../axios/index.js';


export default {
    props: ['responseValue', 'isSearch'],
    components: {
        PostDetail,
    },
    data() {
        return {
            postList: [],
            pageSize: 10,
            currentPage: 0,
            isLastPage: false,
            isLoading: false,
            isModalPostDetailOpen: false,
            selectedPostId: null,
            /* 검색관련 */
            searchType: '',
            searchValue: '',
            searchCurrentPage: 0,
            searchPageSize: 0,
            isSearchLastPage: false,
            postlikeCount: 0,
            selectedPostUserNickname: '',
        }
    },

    created() {
        this.loadPosts();
    },
    mounted() {
        window.addEventListener("scroll", this.scrollPagination)
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
        scrollPagination() {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
            if (nearBottom && !this.isLastPage && !this.isLoading) {
                this.currentPage++;
                this.loadPosts();
            }
            if (nearBottom && this.isSearch === true) {
                this.searchCurrentPage++;
                this.loadSearchUser();
            }

        },
        async loadPosts() {
            try {
                this.isLoading = true;
                const params = {
                    page: this.currentPage,
                    size: this.pageSize,
                }
                // if(this.searchType === "name"){
                //     params.name = this.searchValue;
                // }else if(this.searchType === "category"){
                //     params.category = this.searchValue;
                // }
                console.log(params);
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/post/main`, { params });
                const receivedData = response.data;

                const addPostList = receivedData.content.map(post => ({ ...post }))
                if (addPostList.length < this.pageSize) {
                    this.isLastPage = true;
                }
                this.postList = [...this.postList, ...addPostList];

            } catch (error) {
                console.log(error)
            }
            this.isLoading = false;
        },
        async loadSearchUser() {
            console.log(" loadSearchUser() 실행!!!!!!!!! ");

            /* 마지막페이지에서 페이지네이션 실행 X */
            if (this.responseValue.totalPages < this.searchCurrentPage) {
                console.log("마지막페이지에서 페이지네이션 실행 X");
                return;
            }

            const searchParams = {
                page: this.searchCurrentPage,
                size: this.searchPageSize,
            }

            this.$emit('searchParams', searchParams);
            console.log("loadSearchUser() 페이지 파라미터 보낸 거 확인");
            console.log(searchParams);

        },
        async loadSearchTitle() {

        },
        async loadSearchCategory() {

        },
        closePostDetailModal() {
            console.log("closePostDetailModal() 실행!!!")
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

button {
    margin-top: 10px;
    cursor: pointer;
}

/* middle-parent의 디자인 */
.content-box {
    width: 100%;
    /* 부모 컨테이너인 #middle-parent에 맞게 너비 조정 */
    height: auto;
    /* 내용에 따라 높이 자동 조절 */
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #EAEBEC;
    display: flex;
    justify-content: space-around;
    /* 내부 post들 사이의 간격 조정 */
    flex-wrap: wrap;
    /* 내용이 많아지면 다음 줄로 넘김 */
    padding: 20px;
    /* margin: 20px; */
}

.post-design {
    background: #F1F3F5;
    padding: 10px;
    border: none;
    border-radius: 8px;
    width: calc(33.3% - 40px);
    /* 3개의 포스트가 같은 줄에 들어갈 수 있도록 너비 조정, 여백 고려 */
    margin-bottom: 20px;
    /* 주변 여백 제공 */
    height: auto;
    /* 내용에 따라 높이 자동 조절 */
    position: relative;
    /* 내부 절대 위치 요소의 기준 */
    cursor: pointer;
    max-height: 300px;
}


.post-image {
    width: 100%;
    /* post 컨테이너에 맞게 이미지 너비 조정 */
    height: 50%;
    /* 이미지의 비율을 유지하면서 높이 조정 */
    top: 0;
    left: 0;
    /* 이미지의 위치를 조정 */
    background-size: contain;
    object-fit: cover;
    margin-bottom: 30px;

}

.post-info {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 아이콘과 텍스트 사이의 간격 */
    margin-bottom: 10px;
    /* 다음 요소와의 간격 */
}

.post-icon {
    width: 21px;
    height: 21px;
}

.post-author {
    color: black;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
}

.post-description {
    color: black;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 10px;
    /* 다음 요소와의 간격 */
}

.post-details {
    display: flex;
    justify-content: space-between;
    /* 요소들을 양 끝으로 분산 */
    align-items: center;
}

.post-location {
    color: #8A8A8A;
    font-size: 13px;
    font-weight: 500;
    line-height: 22.75px;
}

.post-score {
    color: black;
    font-size: 16px;
    font-weight: 500;
    line-height: 24.50px;
}


</style>