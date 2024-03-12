import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const EXPIRATION_KEY = 'exp';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const decodeToken = (token) => {
    if (!token) return null;
    return jwtDecode(token);
};

// Access Token 가져오는 함수
const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

// Refresh Token 가져오는 함수
const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

// Access Token 유효성 검증 함수
const isAccessTokenExpired = (token) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return true;

    const expirationDate = new Date(decodedToken[EXPIRATION_KEY] * 1000);
    const now = new Date();
    const remainingTime = expirationDate.getTime() - now.getTime();

    // **변경 사항:** 만료 시간이 30초 이하 남았으면 만료 처리
    return remainingTime <= 30 * 1000;
};

// Axios Interceptor 설정
axiosInstance.interceptors.request.use(
    async (config) => {
        const AccessToken = getAccessToken();
        if(AccessToken) {
            config.headers.Authorization = `Bearer ${AccessToken}`;
        }
        if (isAccessTokenExpired(getAccessToken())) {
           // Access Token 유효 시 Refresh Token 추가
           const refreshToken = getRefreshToken();
           if (refreshToken) {
               config.headers['Refresh-Token'] = `Bearer ${refreshToken}`;
           }
        }
        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        const newAccessToken = response.headers['new-access-token']
        if(newAccessToken)
        {
            localStorage.setItem('access_token', newAccessToken)
        }
        
        if (response.status === 403) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = '/main';
        }
        if (response.status === 500) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = '/main';
        }
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
