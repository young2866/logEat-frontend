<script setup>

import HeaderComponent from '@/components/HeaderComponent.vue'
import LeftSectionComponent from '@/components/LeftSectionComponent.vue'
import CenterSectionComponent from '@/components/CenterSectionComponent.vue'

</script>
<template>
    <HeaderComponent />
    <div id="main-parent">

        <!-- 왼쪽 박스 - 검색/좋아요 받은 피드-->
        <LeftSectionComponent class="left-section"></LeftSectionComponent>
        <!-- 가운데 박스 - 피드 -->
        <div id="middle-parent">
            <div class="content-box">
                <CenterSectionComponent></CenterSectionComponent>
            </div>
        </div>
        <!-- 오른쪽 박스- 최근업데이트 된 프로필 -->
        <div id="right-parent">
            <div class="profile-updates-box">
                <div class="updates-title">최근 업데이트 된 프로필</div>
                <div class="switch-buttons">
                    <div class="switch-left"></div>
                    <div class="switch-right"></div>
                </div>
                <!-- 추가적인 프로필 업데이트 내용 -->
            </div>
            <!-- right-parent 내에 추가적인 요소나 섹션이 필요할 경우 여기에 포함 -->
        </div>
    </div>
</template>



<style>
@import "../css/style.css";
</style>

