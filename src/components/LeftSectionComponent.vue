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


<script>
//import { onMounted, ref } from 'vue';
import axios from 'axios';

//import CenterSectionComponent from '@/components/CenterSectionComponent.vue'



// const week = ref(true); 
// const month = ref(true);
// const isSearchActive = ref(null);
// const isLikeActive = ref(null);
// let searchValue = ref(null);
// let responseData = ref('');

// const vo = ref(''); // 테스트용
// const props = defineProps(['testvalue']);

export default {
  data() {
    return {
      week : true,
      month : true,
      isSearchActive : null,
      isLikeActive : null, 
      searchValue : null,
      responseData : '',
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
        this.$emit('handleSearch', this.responseData);
        console.log("searchHub searchResult 실행!!");   
      },
      async searchUser() {
        console.log("searchUser()실행111");
        const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/userName`;
        await axios.get(url, {
          params: {
            userName: this.searchValue
          }, })
          .then((res) => {
            this.responseData = res.data;
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
          this.responseData = res.json();
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
          this.responseData = res.json();
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


</style>
