
    <template>
    <HeaderComponent />
    <div id="main-parent">

        <!-- 왼쪽 박스 - 검색/좋아요 받은 피드-->
        <LeftSectionComponent class="left-section" @handleSearch="handleSearch"></LeftSectionComponent>
        <!-- 가운데 박스 - 피드 -->
        <CenterSectionComponent :responseValue="responseValue"></CenterSectionComponent>
        <!-- 오른쪽 박스- 최근업데이트 된 프로필 -->
        <div id="right-parent">
            <div class="profile-updates-box">
                <div class="updates-title">최근 글을 작성한 팔로워</div>
                <div class="switch-buttons">
                    <div class="switch-left"></div>
                    <div class="switch-right"></div>
                    
                </div>
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
            responseValue : '',
        }
    },
    methods: {
        handleSearch(res) {
            console.log("왼쪽창에서 메인창 부모로 실행로그 + 받은 데이터 확인!!!!");
            console.log(res);
            this.responseValue = res;
            

        },
    },

}
</script>



<style>
@import "../css/style.css";
</style>

