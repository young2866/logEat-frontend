<template>
    <div
        style="width: 1143px; height: 939px; left: 34px; top: 30px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
        <div style="width: 1081px; height: 331px; left: 30px; top: 29px; position: absolute">

            <!-- <div style="width: 309px; height: 331px; left: 0px; top: 0px; position: absolute">
            <div style="padding-right: 216.25px; left: 0px; top: 230px; position: absolute; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
            <img style="width: 21px; height: 21px" src="https://via.placeholder.com/21x21" />
            <div style="width: 39.11px; height: 18px; color: black; font-size: 14.06px; font-family: Inter; font-weight: 600; line-height: 22px; word-wrap: break-word">장은지</div>
            <div style="padding-right: 7.08px"></div>
            </div>
            <div style="padding-right: 36.33px; left: 0px; top: 265.50px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
            <div style="color: black; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 24px; word-wrap: break-word">에너지 바 2개</div>
            </div>
            <div style="width: 309.33px; height: 22.75px; left: 0px; top: 295.50px; position: absolute">
            <div style="left: 0px; top: 0px; position: absolute"></div>
            <div style="padding-right: 1.66px; left: 59.73px; top: 0px; position: absolute"></div>
            <div style="left: 0px; top: -2.50px; position: absolute; color: #8A8A8A; font-size: 13px; font-family: Inter; font-weight: 500; line-height: 22.75px; word-wrap: break-word">플레이 데이타 동작점</div>
            <div style="left: 265px; top: -1.50px; position: absolute; color: black; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24.50px; word-wrap: break-word">99</div>
            </div>
            <img style="width: 247px; height: 225px; left: 29px; top: 0px; position: absolute" src="https://via.placeholder.com/247x225" />
            <div style="width: 24px; height: 24px; left: 238px; top: 292px; position: absolute">
                <img style="width: 24px; height: 22.5px; top: 1px; position: absolute; border: 2px" src="../assets/Heart.png">
            </div>
        </div> -->

        <div style="width: 1143px; height: 939px; left: 34px; top: 30px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
                <div v-for="post in postList.slice(currentPage * pageSize, (currentPage + 1) * pageSize)" :key="post.id">
                    <div style="width: 309px; height: 331px; left: 0px; top: 0px; position: absolute">
                        <div style="padding-right: 216.25px; left: 0px; top: 230px; position: absolute; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                            <img style="width: 21px; height: 21px" src="https://via.placeholder.com/21x21" />
                            <div style="width: 39.11px; height: 18px; color: black; font-size: 14.06px; font-family: Inter; font-weight: 600; line-height: 22px; word-wrap: break-word">{{ post.userNickname }}</div>
                            <div style="padding-right: 7.08px"></div>
                        </div>
                        <div style="padding-right: 36.33px; left: 0px; top: 265.50px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                            <div style="color: black; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 24px; word-wrap: break-word">{{ post.title }}</div>
                        </div>
                        <div style="width: 309.33px; height: 22.75px; left: 0px; top: 295.50px; position: absolute">
                            <div style="left: 0px; top: 0px; position: absolute"></div>
                            <div style="padding-right: 1.66px; left: 59.73px; top: 0px; position: absolute"></div>
                            <div style="left: 0px; top: -2.50px; position: absolute; color: #8A8A8A; font-size: 13px; font-family: Inter; font-weight: 500; line-height: 22.75px; word-wrap: break-word">플레이 데이타 동작점</div>
                            <div style="left: 265px; top: -1.50px; position: absolute; color: black; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24.50px; word-wrap: break-word">{{ post.likeCount }}</div>
                        </div>
                        <img style="width: 247px; height: 225px; left: 29px; top: 0px; position: absolute" :src="post.thumbnailPath" />
                        <div style="width: 24px; height: 24px; left: 238px; top: 292px; position: absolute">
                            <img style="width: 24px; height: 22.5px; top: 1px; position: absolute; border: 2px" src="../assets/Heart.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            postList: [],
            pageSize: 10,
            currentPage: 0,
            searchType: '',
            searchValue: '',
            isLastPage: false,
            isLoading: false,
        }
    },
    created() {
        this.loadPosts();
    },
    mounted() {
        window.addEventListener("scroll", this.scrollPagination)
    },
    methods: {
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
        }
    }
}
</script>

<style lang="scss" scoped></style>