
    <template>
    <HeaderComponent />
    <div id="main-parent">

        <!-- 왼쪽 박스 - 검색/좋아요 받은 피드-->
        <LeftSectionComponent class="left-section" :test="testvalue" @handleSearch="handleSearch"></LeftSectionComponent>
        <!-- 가운데 박스 - 피드 -->
        <div id="middle-parent">
            <div class="content-box">
                <!-- 첫 번째 post -->
                <div class="post">
                    <img src="../assets/logeat-default.png" alt="Default" class="post-image" />
                    <div class="post-info">
                        <img src="../assets/logeat-default.png" alt="Default" class="post-icon" />
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
                    <img src="../assets/logeat-default.png" alt="Default" class="post-image" />
                    <div class="post-info">
                        <img src="../assets/logeat-default.png" alt="Default" class="post-icon" />
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
                    <img src="../assets/logeat-default.png" alt="Default" class="post-image" />
                    <div class="post-info">
                        <img src="../assets/logeat-default.png" alt="Default" class="post-icon" />
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
                
                <CenterSectionComponent></CenterSectionComponent>

            </div>
        </div>
        <!-- 오른쪽 박스- 최근업데이트 된 프로필 -->
        <div id="right-parent">
            <div class="profile-updates-box">
                <div class="updates-container">
                    <div class="updates-title">최근 업데이트 된 프로필</div>
                    <div class="switch-buttons">
                        <div class="switch-left">
                            <!-- <i class="fa-light fa-angle-left"></i> -->
                            <font-awesome-icon icon="fa-light fa-angle-left" />
                            <!-- <font-awesome-icon :icon="['fal', 'angle-left']" /> -->
                        </div>
                        <div class="switch-right">
                            <font-awesome-icon :icon="['fal', 'angle-right']" />
                        </div>
                    </div>
                </div>
                
                <!-- 추가적인 프로필 업데이트 내용 -->
            </div>
            <!-- right-parent 내에 추가적인 요소나 섹션이 필요할 경우 여기에 포함 -->
        </div>
    </div>
</template>


<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowRight)

import HeaderComponent from '@/components/HeaderComponent.vue'
import LeftSectionComponent from '@/components/LeftSectionComponent.vue'
import CenterSectionComponent from '@/components/CenterSectionComponent.vue'


export default {
    components: {
        FontAwesomeIcon,
        HeaderComponent,
        LeftSectionComponent,
        CenterSectionComponent,
    },
    data() {
        return {
            testvalue : 0,
        }
    },
    methods: {
        handleSearch(res) {
            console.log("왼쪽창에서 메인창 부모로 실행로그!!!!");
            console.log(res);
            
        },
    },

}
</script>



<style>
@import "../css/style.css";
</style>

