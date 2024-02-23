<template>
    <div id="left-parent">

        <div class="search-box">

            <div class="magnifier-icon">

                <img src="../assets/Magnifier.png" alt="Search" width="30" height="30">

                <div class="search-text">검색하기</div>
            </div>
            <div class="search-buttons">
                <button style="margin-left:5%;" class="side_button" @click="toggleSearchActive('user')"
                    :class="{ 'active': isSearchActive === 'user' }"> 유저 </button>
                <button class="side_button" @click="toggleSearchActive('title')"
                    :class="{ 'active': isSearchActive === 'title' }"> 제목 </button>
                <button style="margin-right:5%;" class="side_button" @click="toggleSearchActive('category')"
                    :class="{ 'active': isSearchActive === 'category' }">카테고리</button>
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
                <MonthlyLikeComponent v-if="isLikeActive === 'month'"></MonthlyLikeComponent>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
// import { ref } from 'vue';
import WeeklyLikeComponent from './WeeklyLikeComponent.vue';
import MonthlyLikeComponent from './MonthlylikeComponent.vue';
//import { faL } from '@fortawesome/free-solid-svg-icons';



// const isSearchActive = ref(null);
// const isLikeActive = ref(null);

// const toggleSearchActive = (selection) => {
//     isSearchActive.value = selection;
// };

// const setLikeActive = (filterType) => {
//   isLikeActive.value = filterType;
// };

export default {
    props:['searchResValue'],
    components:{
        WeeklyLikeComponent,
        MonthlyLikeComponent,
    },
    data() {
        return {
            week: true,
            month: true,
            pageSize: 7,
            currentPage: 0,
            isSearchActive: null,
            isLikeActive: null,
            searchValue: null,
            responseData: [],
            isSearch: false,
            isLoading: false,
            isInitialLoad: true,
        }
    },
    created() {

    },
    mounted() {
        if(this.isInitialLoad) {
            this.isInitialLoad = false;
        }
        window.addEventListener("scroll", this.scrollPagination)
    },
    // computed: {
        
    // },
    methods: {
        scrollPagination() {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
            if (nearBottom && !this.isLastPage && !this.isLoading) {
                this.currentPage++;
                console.log("검색창 scrollPagination 실행!!!");
                
                this.isLoading = true;
                if (this.isSearchActive === "user") {
                    this.searchUser();
                    console.log("검색창 scrollPagination searchUser 실행!!!");
                    console.log(this.responseData);
                    this.$emit('handleSearch', this.responseData, this.isSearch);
                }else if (this.isSearchActive === "title") {
                    this.searchTitle();
                    console.log("검색창 scrollPagination searchTitle 실행!!!");
                    console.log(this.responseData);
                    this.$emit('handleSearch', this.responseData, this.isSearch);
                }else if (this.isSearchActive === "category") {
                    this.searchCategory();
                    console.log("검색창 scrollPagination searchCategory 실행!!!");
                    console.log(this.responseData);
                    this.$emit('handleSearch', this.responseData, this.isSearch);
                }
            }
        },
        toggleSearchActive(selection) {
            this.isSearchActive = selection;
        },
        setLikeActive(selection) {
            console.log(selection);
            this.isLikeActive = selection;
        },
        async searchHub() {
            if (this.searchValue === null || this.searchValue.trim() === "") {
                alert("검색할 내용을 입력해주세요.")
                return;
            }

            this.currentPage = 0;
            this.responseData = [];
            this.isLastPage = false;
            if (this.isSearchActive === "user") {
                this.isLoading = true;
                await this.searchUser();
            } else if (this.isSearchActive === "title") {
                this.isLoading = true;
                await this.searchTitle();
            } else if (this.isSearchActive === "category") {
                this.isLoading = true;
                await this.searchCategory();
            } else {
                alert("분류를 선택해주세요.")
                return;
            }

            this.isSearch = true;
            this.$emit('handleSearch', this.responseData, this.isSearch);
        },

        async searchUser() {
            console.log("searchUser()실행111");
            const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/userName`;
            console.log(this.currentPage);
            await axios.get(url, {
                params: {
                    userName: this.searchValue,
                    page: this.currentPage,
                    size: this.pageSize,         
                },
                
            }).then((res) => {
                //this.responseData = res;
                //this.responseData = res.data.content.map(post => ({ ...post}));

                const addPostList = res.data.content.map(post => ({ ...post}))
                if (addPostList.length < this.pageSize) {
                    this.isLastPage = true;
                }
                console.log("searchUser()실행22222");
                console.log(this.responseData);

                this.responseData = [...this.responseData, ...addPostList];
                console.log("searchUser()실행33333");
                console.log(this.responseData);
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                console.log('searchUser End!!');
                
            });
            this.isLoading = false;
        },
        async searchTitle() {
            console.log("searchTitle()실행111");
            const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/title`;
            await axios.get(url, {
                params: {
                    titleKeyword: this.searchValue,
                    page: this.currentPage,
                    size: this.pageSize,         
                },
            }).then((res) => {
                //this.responseData = res;

                const addPostList = res.data.content.map(post => ({ ...post}))
                if (addPostList.length < this.pageSize) {
                    this.isLastPage = true;
                }
                console.log("searchTitle()실행22222");
                console.log(this.responseData);

                this.responseData = [...this.responseData, ...addPostList];
                console.log("searchTitle()실행33333");
                console.log(this.responseData);

            }).catch((error) => {
                console.log(error);
            }).then(() => {
                console.log('searchTitle End!!');
            });
            this.isLoading = false;
        },
        async searchCategory() {
            console.log("searchCategory()실행111 category");
            const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/category`;
            await axios.get(url, {
                params: {
                    category: this.searchValue,
                    page: this.currentPage,
                    size: this.pageSize,         
                },
            }).then((res) => {
                //this.responseData = res;

                const addPostList = res.data.content.map(post => ({ ...post}))
                if (addPostList.length < this.pageSize) {
                    this.isLastPage = true;
                }
                console.log("searchTitle()실행22222");
                console.log(this.responseData);

                this.responseData = [...this.responseData, ...addPostList];
                console.log("searchTitle()실행33333");
                console.log(this.responseData);


            }).catch((error) => {
                console.log(error);
            }).then(() => {
                console.log('searchCategory End!!');
                
            });
            this.isLoading = false;
        },

    }
}

// onMounted(() => {

// console.log('메인창으로부터 전달받음');

// vo.value = props.testvalue // vo에 받아온 props 값을 매핑함

// })

  
  

// const toggleSearchActive = (selection) => {

// isSearchActive.value = selection;

// };

  

// const toggleLikeActive = (selection) => {

// isLikeActive.value = selection;

// };

  

// const searchHub = () => {

// console.log("searchHub 실행!!");

// console.log(isSearchActive.value);

  

// console.log("searchhub 중복검사 확인!!");

// console.log(searchValue.value);

// if(searchValue.value === null || searchValue.value.trim() === "") {

// alert("검색할 내용을 입력해주세요.")

// return;

// }

  

// if(isSearchActive.value === "user") {

// console.log("searchHub user 실행!!");

// searchUser();

// }else if(isSearchActive.value === "title") {

// console.log("searchHub title 실행!!");

// searchTitle();

// }else if(isSearchActive.value === "category") {

// console.log("searchHub category 실행!!");

// searchCategory();

// }else {

// alert("분류를 선택해주세요.")

// return;

// }

  

// console.log("searchHub searchResult 실행!!");

// console.log("searchHub searchResult 실행22222");

// }

  
  
  
  

// async function searchUser() {

  

// console.log("searchUser()실행111");

// const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/userName`;

// await axios.get(url, {

// params: {

// userName: searchValue.value

// },

// }).then((res) => {

// responseData.value = res.data;

// }).catch((error) => {

// console.log(error);

// }).then(() => {

// console.log('searchUser End!!');

// });

// }

  

// async function searchTitle() {

// console.log("searchTitle()실행111");

// const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/title`;

// await axios.get(url, {

// params: {

// titleKeyword: searchValue.value

// },

// }).then((res) => {

// responseData.value = res.json();

// }).catch((error) => {

// console.log(error);

// }).then(() => {

// console.log('searchTitle End!!');

// });

// }

  

// async function searchCategory() {

// console.log("searchTitle()실행111");

// const url = `${process.env.VUE_APP_API_BASE_URL}/post/search/title`;

// await axios.get(url, {

// params: {

// titleKeyword: searchValue.value

// },

// }).then((res) => {

// responseData.value = res.json();

// }).catch((error) => {

// console.log(error);

// }).then(() => {

// console.log('searchCategory End!!');

// });

// }

</script>

<style scoped>
@import "../css/LeftStyle.css";
</style>