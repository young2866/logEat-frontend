
    <template>
    <HeaderComponent />
    <div id="main-parent">

        <!-- 왼쪽 박스 - 검색/좋아요 받은 피드-->
        <LeftSectionComponent class="left-section" @handleSearch="handleSearch" :searchResValue="searchResValue"></LeftSectionComponent>
        <!-- 가운데 박스 - 피드 -->
        <CenterSectionComponent :responseValue="responseValue" :isSearch="isSearch" @searchParams="searchParams" ></CenterSectionComponent>
        <!-- 오른쪽 박스- 최근업데이트 된 프로필 -->
        <div id="right-parent">
            <div class="profile-updates-box">
                <div class="updates-title">최근 글을 작성한 팔로워</div>
                
                <div><LatestPostComponent></LatestPostComponent></div>
                <!-- 추가적인 프로필 업데이트 내용 --> 
            </div> 
           
            <!-- right-parent 내에 추가적인 요소나 섹션이 필요할 경우 여기에 포함 -->
        </div>
    </div>
</template>


<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


library.add(faArrowRight)

import HeaderComponent from '@/components/HeaderComponent.vue'
import LeftSectionComponent from '@/components/LeftSectionComponent.vue'
import CenterSectionComponent from '@/components/CenterSectionComponent.vue'
import LatestPostComponent from '@/components/LatestPostComponent.vue';

export default {
    components: {
        HeaderComponent,
        LeftSectionComponent,
        CenterSectionComponent,
        LatestPostComponent,
    },
    data() {
        return {
            //검색 -> 중앙
            responseValue : '',
            isSearch: false,

            //중앙 -> 검색
            searchResValue : '',
            isModalOpen: false,  //이거 추가한겨
        }
    },
    methods: {
        // 이거 모달 스크롤 추가
        openModal() {
        this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        // 여기까지 
        handleSearch(res, issearch) {
            console.log("왼쪽창에서 메인창 부모로 실행로그 + 받은 데이터 확인!!!!");
            console.log(res);
            console.log(issearch);
            this.responseValue = res;
            this.isSearch = issearch;
        },
        searchParams(res) {
            this.searchResValue = res;
        }
 
    },

}
</script>



<style>
@import "../css/style.css";
</style>

