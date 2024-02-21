<template>
    <div v-if="isModalPostDetailOpen" class="modal-container">
        <div class="modal-content" @click.stop>
          <div class="modal-inner">
            <!-- <PostDetail v-if="isModalPostDetailOpen" :id="selectedPostId"></PostDetail> -->
            <PostDetail :id="selectedPostId"/>
          </div>
        </div>
      </div>
    

    <div id="middle-parent">
        <div class="content-box">
            <div class="post-design" v-for="post in postList" :key="post.id" @click="openPostDetailModal(post.id)">
                <img src="https://via.placeholder.com/247x225" class="post-image" alt="Product Image" />
                <div class="post-info">
                    <img src="https://via.placeholder.com/21x21" class="post-icon" alt="Icon" />
                    <div class="post-author">{{ post.userNickname }}</div>
                </div>
                <div class="post-description">{{ post.title }}</div>
                <div class="post-details">
                    <div class="post-location">플레이 데이타 동작점</div>
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

export default {
    components: {
        PostDetail,
    },
    data() {
        return {
            postList: [],
            pageSize: 10,
            currentPage: 0,
            searchType: '',
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            isModalPostDetailOpen: false,
            selectedPostId: null,
        }
    },

    created() {
        this.loadPosts();
    },
    mounted() {
        window.addEventListener("scroll", this.scrollPagination)
    },
    methods: {
        openPostDetailModal(id) {
            this.selectedPostId = id;
            this.isModalPostDetailOpen = !this.isModalPostDetailOpen;
        },
        scrollPagination() {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (nearBottom && !this.isLastPage && !this.isLoading) {
                this.currentPage++;
                this.loadPosts();
            }
        },
        async loadPosts() {
            this.isLoading = true;
            try {
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

                const addPostList = receivedData.content.map(posts => ({ ...posts, quantity: 0 }))
                if (addPostList.length < this.pageSize) {
                    this.isLastPage = true;
                }
                this.postList = [...this.postList, ...addPostList];

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

        },
        async loadSearchTitle() {

        },
        async loadSearchCategory() {

        },
    }
}
</script>

<style lang="scss" scoped>
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
    height: 95%;
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

}

.post-image {
    width: 100%;
    /* post 컨테이너에 맞게 이미지 너비 조정 */
    height: auto;
    /* 이미지의 비율을 유지하면서 높이 조정 */
    top: 0;
    left: 0;
    /* 이미지의 위치를 조정 */
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