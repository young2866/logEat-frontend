<template>
    <div id="left-parent">
        <div class="search-box">
            
            <div class="magnifier-icon">
                <img src="../assets/Magnifier.png" alt="Search" width="30" height="30">
                <div class="search-text">검색하기</div>
            </div>
            
        
            <div class="search-buttons">
                <button style="margin-left:5%;" class="side_button" @click="toggleSearchActive('user')" :class="{ 'active': isSearchActive === 'user' }" >   유저   </button>
                <button class="side_button" @click="toggleSearchActive('title')" :class="{ 'active': isSearchActive === 'title' }" >   제목   </button>
                <button style="margin-right:5%;" class="side_button" @click="toggleSearchActive('category')" :class="{ 'active': isSearchActive === 'category' }" >카테고리</button>
            </div>

            <div class="search-bar">
                <div class="input-container">
                  <input type="text" v-model="searchValue" @keypress.enter="searchHub" placeholder="검색할 내용을 입력해주세요" />
                </div>
            </div>
        </div>
        <div class="likes-box">
            <div class="star-icon">
                <img src="../assets/star.png" alt="Likes" width="30" height="30">
                <div class="likes-text">좋아요를 가장 많이 받은 글</div>
            </div>
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


<script>
import { ref } from 'vue';
import axios from 'axios';
import WeeklyLikeComponent from './WeeklyLikeComponent.vue';
import MonthlylikeComponent from './MonthlylikeComponent.vue';

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

export default {
  data() {
    return {
      week : true,
      month : true,
      isSearchActive : null,
      isLikeActive : null, 
      searchValue : null,
      responseData : '',
      isSearch : false,
    }
  },
  created() {
      
  },
  mounted() {
      window.addEventListener("scroll", this.scrollPagination)
  },
  methods: {
      toggleSearchActive(selection) {
        this.isSearchActive = selection;
      },
      toggleLikeActive(selection) {
        this.isLikeActive = selection;
      },
      async searchHub() {
        console.log("searchHub 실행!!");
        console.log(this.isSearchActive);

        console.log("searchhub 중복검사 확인!!");
        console.log(this.searchValue);

        if(this.searchValue === null || this.searchValue.trim() === "") {
            alert("검색할 내용을 입력해주세요.")
            return;
        }

        if(this.isSearchActive === "user") {
          console.log("searchHub user 실행!!");
          await this.searchUser(); 
        }else if(this.isSearchActive === "title") {
          console.log("searchHub title 실행!!");
          await this.searchTitle();
        }else if(this.isSearchActive === "category") {
          console.log("searchHub category  실행!!");
          await this.searchCategory();
        }else {
          alert("분류를 선택해주세요.")
          return;
        }

        this.isSearch = true;
        console.log("searchHub 부모로 보내기전 값 확인");   
        console.log(this.responseData.data);
        console.log(this.isSearch);
        

        this.$emit('handleSearch', this.responseData.data, this.isSearch);
      },
      async searchUser() {
        console.log("searchUser()실행111");
        const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/userName`;
        await axios.get(url, {
          params: {
            userName: this.searchValue
          }, })
          .then((res) => {
            this.responseData = res;
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            console.log('searchUser End!!');
        });  
      },
      async searchTitle() {
        console.log("searchTitle()실행111");
        const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/title`;
        await axios.get(url, {
          params: {
            titleKeyword: this.searchValue
        },
        }).then((res) => {
          this.responseData = res;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          console.log('searchTitle End!!');
        });
      },
      async searchCategory() {
        console.log("searchTitle()실행111");
        const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/title`;
        await axios.get(url, {
          params: {
            titleKeyword: this.searchValue
        },
        }).then((res) => {
          this.responseData = res;
        }).catch((error) => {
          console.log(error);
        }).then(() => {
          console.log('searchCategory End!!');
        });
      }

    }

}
// onMounted(() => {
//     console.log('메인창으로부터 전달받음');
//     vo.value = props.testvalue // vo에 받아온 props 값을 매핑함
// })


// const toggleSearchActive = (selection) => {
//     isSearchActive.value = selection;
// };

// const toggleLikeActive = (selection) => {
//     isLikeActive.value = selection;
// };

// const searchHub = () => {
//     console.log("searchHub 실행!!");
//     console.log(isSearchActive.value);
    

//     console.log("searchhub 중복검사 확인!!");
//     console.log(searchValue.value);
//     if(searchValue.value === null || searchValue.value.trim() === "") {
//         alert("검색할 내용을 입력해주세요.")
//         return;
//     }

//     if(isSearchActive.value === "user") {
//         console.log("searchHub user 실행!!");
//         searchUser(); 
//     }else if(isSearchActive.value === "title") {
//         console.log("searchHub title 실행!!");
//         searchTitle();
//     }else if(isSearchActive.value === "category") {
//         console.log("searchHub category  실행!!");
//         searchCategory();
//     }else {
//         alert("분류를 선택해주세요.")
//         return;
//     }

//     console.log("searchHub searchResult 실행!!");    
//     console.log("searchHub searchResult 실행22222");
// }




// async function searchUser() {

//     console.log("searchUser()실행111");
//     const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/userName`;
//       await axios.get(url, {
//         params: {
//             userName: searchValue.value
//         },
//       }).then((res) => {
//         responseData.value = res.data;
//       }).catch((error) => {
//         console.log(error);
//       }).then(() => {
//         console.log('searchUser End!!');
//       });
// }

// async function searchTitle() {
//     console.log("searchTitle()실행111");
//     const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/title`;
//       await axios.get(url, {
//         params: {
//             titleKeyword: searchValue.value
//         },
//       }).then((res) => {
//         responseData.value = res.json();
//       }).catch((error) => {
//         console.log(error);
//       }).then(() => {
//         console.log('searchTitle End!!');
//       });
// }

// async function searchCategory() {
//     console.log("searchTitle()실행111");
//     const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/title`;
//       await axios.get(url, {
//         params: {
//             titleKeyword: searchValue.value
//         },
//       }).then((res) => {
//         responseData.value = res.json();
//       }).catch((error) => {
//         console.log(error);
//       }).then(() => {
//         console.log('searchCategory End!!');
//       });
// }





</script>

<style lang="scss" scoped>
@import "../css/LeftStyle.css";
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
