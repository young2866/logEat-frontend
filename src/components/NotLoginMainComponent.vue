<script setup>

import { ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const week = ref(true)
const month = ref(true)

const isSearchActive = ref(null);
const isLikeActive = ref(null);

const toggleSearchActive = (selection) => {
    isSearchActive.value = selection;
};

const toggleLikeActive = (selection) => {
    isLikeActive.value = selection;
};


</script>


<template>
    <HeaderComponent/>
    <div style="width: 1920px; height: 1080px; position: relative; background: white">
    <div style="width: 1920px; height: 1080px; left: 0px; top: 0px; position: absolute">
        <div style="width: 1210px; height: 968px; left: 354px; top: 30px; position: absolute; background: white">
            <div style="width: 1143px; height: 939px; left: 34px; top: 30px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
                <div style="width: 1081px; height: 331px; left: 30px; top: 29px; position: absolute">
                <div style="width: 309px; height: 331px; left: 0px; top: 0px; position: absolute">
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
                    <div style="width: 16.87px; height: 14.96px; left: 3.56px; top: 5.04px; position: absolute; border: 2px #FF4500 solid"></div>
                    </div>
                </div>
                <div style="width: 309px; height: 331px; left: 386px; top: 0px; position: absolute">
                    <div style="padding-right: 216.25px; left: 0px; top: 230px; position: absolute; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                    <img style="width: 21px; height: 21px" src="https://via.placeholder.com/21x21" />
                    <div style="width: 39.11px; height: 18px; color: black; font-size: 14.06px; font-family: Inter; font-weight: 600; line-height: 22px; word-wrap: break-word">장은지</div>
                    <div style="padding-right: 7.08px"></div>
                    </div>
                    <div style="padding-right: 36.33px; left: 0px; top: 265.50px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                    <div style="color: black; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 24px; word-wrap: break-word">잘못산 양배추 사과 즙</div>
                    </div>
                    <div style="width: 309.33px; height: 22.75px; left: 0px; top: 295.50px; position: absolute">
                    <div style="left: 0px; top: 0px; position: absolute"></div>
                    <div style="padding-right: 1.66px; left: 59.73px; top: 0px; position: absolute"></div>
                    <div style="left: 0px; top: -2.50px; position: absolute; color: #8A8A8A; font-size: 13px; font-family: Inter; font-weight: 500; line-height: 22.75px; word-wrap: break-word">플레이 데이타 동작점</div>
                    <div style="left: 265px; top: -1.50px; position: absolute; color: black; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24.50px; word-wrap: break-word">12</div>
                    </div>
                    <div style="width: 24px; height: 24px; left: 238px; top: 292px; position: absolute">
                    <div style="width: 16.87px; height: 14.96px; left: 3.56px; top: 5.04px; position: absolute; border: 2px #FF4500 solid"></div>
                    </div>
                    <img style="width: 247px; height: 225px; left: 31px; top: 0px; position: absolute" src="https://via.placeholder.com/247x225" />
                </div>
                <div style="width: 309px; height: 331px; left: 772px; top: 0px; position: absolute">
                    <div style="padding-right: 216.25px; left: 0px; top: 230px; position: absolute; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                    <img style="width: 21px; height: 21px" src="https://via.placeholder.com/21x21" />
                    <div style="width: 39.11px; height: 18px; color: black; font-size: 14.06px; font-family: Inter; font-weight: 600; line-height: 22px; word-wrap: break-word">장은지</div>
                    <div style="padding-right: 7.08px"></div>
                    </div>
                    <div style="padding-right: 36.33px; left: 0px; top: 265.50px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                    <div style="color: black; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 24px; word-wrap: break-word">아침 사과가 몸에 좋대요</div>
                    </div>
                    <div style="width: 309.33px; height: 22.75px; left: 0px; top: 295.50px; position: absolute">
                    <div style="left: 0px; top: 0px; position: absolute"></div>
                    <div style="padding-right: 1.66px; left: 59.73px; top: 0px; position: absolute"></div>
                    <div style="left: 0px; top: -2.50px; position: absolute; color: #8A8A8A; font-size: 13px; font-family: Inter; font-weight: 500; line-height: 22.75px; word-wrap: break-word">플레이 데이타 동작점</div>
                    <div style="left: 265px; top: -1.50px; position: absolute; color: black; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24.50px; word-wrap: break-word">27</div>
                    </div>
                    <div style="width: 24px; height: 24px; left: 238px; top: 292px; position: absolute">
                    <div style="width: 16.87px; height: 14.96px; left: 3.56px; top: 5.04px; position: absolute; border: 2px #FF4500 solid"></div>
                    </div>
                    <img style="width: 247px; height: 225px; left: 31px; top: 0px; position: absolute" src="https://via.placeholder.com/247x225" />
                </div>
                </div>
            </div>
        </div>

        <div style="width: 354px; height: 968px; left: 0px; top: 30px; position: absolute; background: white">
            <div style="width: 332px; height: 253px; left: 22px; top: 29px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
                
                <div style="width: 55.51px; height: 28px; left: 74px; top: 44.50px; position: absolute; color: #555555; font-size: 15px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word">검색하기</div>
                

                <div>
                <!-- <button @click="toggleSearchActive('user')" :class="{ 'active': isSearchActive === 'user' }" style="width: 76.33px; height: 14px; left: 57px; top: 110px; position: absolute; color: #666666; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 14px; word-wrap: break-word">
                    유저 검색
                </button>
                
                <button @click="toggleSearchActive('menu')" :class="{ 'active': isSearchActive === 'menu' }" style="width: 76.33px; height: 14px; left: 146px; top: 110px; position: absolute; color: #666666; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 14px; word-wrap: break-word">
                    메뉴 검색
                </button>
                
                <button @click="toggleSearchActive('store')" :class="{ 'active': isSearchActive === 'store' }" style="width: 76.33px; height: 14px; left: 234px; top: 110px; position: absolute; color: #666666; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 14px; word-wrap: break-word">
                    가게 검색
                </button> -->
                
                    <button style="width: 76px; height: 34px; left: 37px; top: 93px; position: absolute;  border-radius: 12px" :class="{ 'active': isSearchActive === 'user' }" @click="toggleSearchActive('user')" >
                        <div style="width: 65px; height: 14px; left: 8px; top: 10px; position: absolute; font-size: 13.23px; font-family: Inter; font-weight: 500; line-height: 14px; word-wrap: break-word">유저 검색</div>
                    </button>

                    <button style="width: 79px; height: 34px; left: 126px; top: 93px; position: absolute;  border-radius: 12px" :class="{ 'active': isSearchActive === 'menu' }" @click="toggleSearchActive('menu')" >
                        <div style="width: 65px; height: 14px; left: 8px; top: 10px; position: absolute; font-size: 13.23px; font-family: Inter; font-weight: 500; line-height: 14px; word-wrap: break-word">메뉴 검색</div>
                    </button>

                    <button style="width: 79px; height: 34px; left: 214px; top: 93px; position: absolute;  border-radius: 12px" :class="{ 'active': isSearchActive === 'store' }" @click="toggleSearchActive('store')" >
                        <div style="width: 65px; height: 14px; left: 8px; top: 10px; position: absolute; font-size: 13.23px; font-family: Inter; font-weight: 500; line-height: 14px; word-wrap: break-word">가게 검색</div>
                    </button>

                </div>

                <div style="width: 24px; height: 24px; left: 44px; top: 44px; position: absolute">
                    <img src="../assets/Hamburger_LG.png"/>
                </div>


                
                <div style="width: 274px; height: 38px; left: 34px; top: 176px; position: absolute; background: #F1F3F5; border-radius: 12px">
                    <div style="width: 220px; height: 16px; left: 13px; top: 11px; position: absolute">
                        <input style="width: 200px; height: 16px; left: 0px; top: 0px; position: absolute; background-color: #F1F3F5; font-size: 13.12px; font-family: Inter; font-weight: 400; word-wrap: break-word"/>
                    </div>
                </div>
            </div>
        <div style="width: 332px; height: 640.50px; left: 22px; top: 320px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
            <div style="width: 180px; height: 28px; left: 74px; top: 41px; position: absolute; color: #555555; font-size: 15px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word">좋아요를 가장 많이 받은 글</div>
            
            <div style="width: 19.65px; height: 18.74px; left: 37.17px; top: 42.69px; position: absolute;">
                <img src="../assets/Hamburger_LG.png"/>
            </div>
            

            <div>
                <button v-if="week" style="width: 79.56px; height: 34px; left: 29px; top: 93px; position: absolute;  border-radius: 12px" :class="{ 'active': isLikeActive === 'week' }" @click="toggleLikeActive('week')" >
                    <div style="width: 65px; height: 14px; left: 8px; top: 10px; position: absolute; font-size: 13.23px; font-family: Inter; font-weight: 500; line-height: 14px; word-wrap: break-word">
                        <p>지난 주간</p>
                    </div>
                </button>

                <button v-if="month" style="width: 79.56px; height: 34px; left: 116px; top: 93px; position: absolute;  border-radius: 12px" :class="{ 'active': isLikeActive === 'month' }" @click="toggleLikeActive('month')">
                    <div style="width: 65px; height: 14px; left: 8px; top: 10px; position: absolute; font-size: 13.23px; font-family: Inter; font-weight: 500; line-height: 14px; word-wrap: break-word">
                        <p>지난 한달</p>
                    </div>
                </button>
            </div>
            
            <div style="width: 186.11px; height: 24.50px; left: 95px; top: 157px; position: absolute">
                <div style="width: 186.31px; height: 16px; left: 0px; top: 4px; position: absolute; color: #555555; font-size: 13.12px; font-family: Inter; font-weight: 400; line-height: 24.50px; word-wrap: break-word">눈물 젖은 초코파이</div>
            </div>
            <div style="width: 33.94px; height: 20px; left: 95px; top: 193.50px; position: absolute; background: rgba(112, 115, 124, 0.08); border-radius: 4px; overflow: hidden">
                <div style="width: 21.94px; height: 18px; left: 6px; top: 1px; position: absolute">
                    <div style="width: 22.14px; height: 13px; left: 0px; top: 2px; position: absolute; text-align: center; color: #888888; font-size: 10.66px; font-family: Inter; font-weight: 700; line-height: 18px; letter-spacing: 0.25px; word-wrap: break-word">과자</div>
                </div>
            </div>
            <div style="width: 46.50px; height: 20px; left: 134.94px; top: 193.50px; position: absolute; background: rgba(112, 115, 124, 0.08); border-radius: 4px; overflow: hidden">
            <div style="width: 34.50px; height: 18px; left: 6px; top: 1px; position: absolute">
                <div style="width: 34.70px; height: 13px; left: 0px; top: 2px; position: absolute; text-align: center; color: #888888; font-size: 10.66px; font-family: Inter; font-weight: 700; line-height: 18px; letter-spacing: 0.25px; word-wrap: break-word">오리온</div>
            </div>
            </div>
            <img style="width: 32px; height: 32px; left: 43px; top: 170px; position: absolute" src="https://via.placeholder.com/32x32" />
        </div>
        </div>
        <div style="width: 354px; height: 939px; left: 1564px; top: 141px; position: absolute; background: white">
        <div style="width: 332px; height: 640.50px; left: 0px; top: 0px; position: absolute; background: white; border-radius: 16px; overflow: hidden; border: 1px #EAEBEC solid">
            <div style="width: 180px; height: 28px; left: 31px; top: 41px; position: absolute; color: #555555; font-size: 15px; font-family: Inter; font-weight: 600; line-height: 28px; word-wrap: break-word"> 최근 업데이트 된 프로필</div>
            <div style="width: 61px; height: 28px; left: 250px; top: 41px; position: absolute; border-radius: 6px; border: 1px #E1E2E4 solid">
            <div style="width: 29.75px; height: 26px; left: 1px; top: 1px; position: absolute; border-right: 1px #E1E2E4 solid">
                <div style="width: 16px; height: 16px; left: 6.38px; top: 5px; position: absolute">
                <div style="width: 4px; height: 8px; left: 6px; top: 4px; position: absolute; border: 1.33px rgba(48, 48, 48, 0.09) solid"></div>
                </div>
            </div>
            <div style="width: 29.25px; height: 26px; left: 30.75px; top: 1px; position: absolute">
                <div style="width: 16px; height: 16px; left: 6.63px; top: 5px; position: absolute">
                <div style="width: 4px; height: 8px; left: 6px; top: 4px; position: absolute; border: 1.33px #989BA2 solid"></div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>





</template>
  
  
<style>
    
    .active {
        background-color: #FF8C00;
        color: white
    }
    .login-button:hover {
        background-color: #EAEBEC;
    }
    .signup-button:hover {
        text-decoration: underline;
    }
    .write-button:hover {
        text-decoration: underline;
    }
    .dropdown-orange:hover {
        text-decoration: underline;
    }
  .nav-bar {
    width: auto;
    height: 112px; 
    position: relative; 
    background: white; 
    border-bottom: 1px #E8E8E8 solid;
  }
  .dropdown-white:hover {
    background-color: #EAEBEC; 
    }
  .dropdown-white {
    width : 185px;
    height: 50px;
    background: white;
    color: #8A8A8A;
    border-radius: 8px;
    font-family: Inter;
    font-size: 16px;
    border: none;
  }
  .dropdown-orange {
    width : 185px;
    height: 50px;
    background: #FF4500;
    color: white;
    border-radius: 8px;
    font-family: Inter;
    font-size: 16px;
    border: none;
  }
  .write-button { 
    width: 126px;
    height: 48px;
    position: absolute;
    top: 33px;
    left: 88%;
    background: #FF4500;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    color: white;
    font-size: 16px;
    font-family: Inter;
    font-weight: 600;
    line-height: 20.80px;
    word-wrap: break-word;
    border: none; /* Assuming you don't need a border on the button */
  }
  .dropdown-menu {
    position: absolute;
    top: 56px; /* Offset to appear below the image */
    background: white;
    border: 1px solid #E8E8E8;
    border-radius: 8px;
    padding: 12px;
  } 
  .signup-button { 
    width: 126px;
    height: 48px;
    position: absolute;
    top: 33px;
    left: 88%;
    background: #FF4500;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    color: white;
    font-size: 16px;
    font-family: Inter;
    font-weight: 600;
    line-height: 20.80px;
    word-wrap: break-word;
    border: none; /* Assuming you don't need a border on the button */
  }
  .login-button { 
    width: 126px;
    height: 48px;
    position: absolute;
    top: 33px;
    left: 80%;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    color: 8A8A8A;
    font-size: 16px;
    font-family: Inter;
    font-weight: 600;
    line-height: 20.80px;
    word-wrap: break-word;
    border: none; /* Assuming you don't need a border on the button */
  }
</style>

