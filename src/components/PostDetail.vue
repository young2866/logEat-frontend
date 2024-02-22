<template>
    <div class="" v-if="postInfo">
        <div><span class="close" @click="closeModal">&times;</span></div>
        
        <div
            style="width: 100%; height: 450px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 32px; display: inline-flex">
            
            <div style="width: 100%; height: 450px; position: relative">
                <div
                    style="height: 144.50px; padding-bottom: 0.50px; padding-right: 106.95px; left: 0px; top: 0px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                    <div
                        style="color: #212529; font-size: 48px; font-family: Helvetica Neue; font-weight: 900; line-height: 72px; word-wrap: break-word">
                        {{ postInfo.title }}</div>
                </div>
                <div
                    style="width: 100%; left: 0px; top: 176px; position: absolute; justify-content: space-between; align-items: center; display: inline-flex">
                    <div
                        style="padding-bottom: 1px; padding-right: 0.01px; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                        <div
                            style="color: #212529; font-size: 16px; font-family: Helvetica Neue; font-weight: 700; word-wrap: break-word">
                            {{ postInfo.userNickname }}</div>
                        <div
                            style="color: #495057; font-size: 16px; font-family: Helvetica Neue; font-weight: 400; word-wrap: break-word">
                            ·</div>
                        <div
                            style="color: #495057; font-size: 16px; font-family: Helvetica Neue; font-weight: 400; word-wrap: break-word">
                            {{ postInfo.createdTime }}</div>
                    </div>
                    <div style="justify-content: flex-start; align-items: flex-start; display: flex">
                        <div
                            style="width: 96px; align-self: stretch; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                        </div>
                    </div>
                </div>
                <div
                    style="width: 100%; padding-bottom: 14px; left: 0px; top: 222px; position: absolute; justify-content: flex-start; align-items: flex-start; gap: 14px; display: inline-flex">
                    <div
                        style="padding-top: 7px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px; background: #F8F9FA; border-radius: 16px; justify-content: flex-start; align-items: center; display: flex">
                        <div
                            style="color: #FF8C00; font-size: 16px; font-family: Helvetica Neue; font-weight: 500; word-wrap: break-word">
                            {{ postInfo.category }}</div>
                    </div>
                </div>

                <div
                    style="padding-left: 100%; left: 0px; top: 286px; position: absolute; justify-content: flex-end; align-items: center; display: inline-flex">
                    <div
                        style="width: 320px; align-self: stretch; padding-left: 80px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                    </div>
                </div>
                <div
                    style="height: 100%; width: 90%; padding-left: 24px; padding-right: 24px; padding-top: 32px; padding-bottom: 32px; left: 0px; top: 286px; position: absolute; background: #F8F9FA; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.06); border-radius: 8px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 48px; display: inline-flex">
                    <div
                        style="width: 32px; height: 48px; flex-direction: column; justify-content: center; align-items: center; display: flex">
                        <div style="width: 32px; height: 48px; background: #FF8C00"></div>
                    </div>
                    <div
                        style="align-self: stret height: 30px; padding-bottom: 1px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
                        <div
                            style="color: #495057; font-size: 23.81px; font-family: Helvetica Neue; font-weight: 700; word-wrap: break-word">
                            <div v-html="postInfo.contents" ></div></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'], // id prop 받기
    data() {
        return {
            postInfo: null, // 초기값 null 설정
            isModalVisible: false,

        }
    },
    mounted() {
        this.postDetail();
        console.log('mounted:', this.id)
    },
    methods: {
        async postDetail() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/post/${this.id}/detail`);
                this.postInfo = response.data;

            } catch (error) {
                console.error("게시글 정보 가져오기 오류:", error);
                // 오류 처리 (예: 오류 메시지 표시)
            }
        },
        closeModal() {
            this.$emit('closePostDetailModal');
            console.log("PostDetail컴포넌트 closeModal() 실행!!!")
        }
    }
}

</script>

<style lang="scss" scoped>
.close {
    top: 5px; /* 상단으로부터 5px */
    left: 0px; /* 좌측으로부터 10px */
    color: #aaa;
    cursor: pointer;
    font-size: 24px;
  }
  
  .close:hover {
    color: black; /* 닫기 버튼 호버 색상 */
  }
</style>
