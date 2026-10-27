// axios: 서버와 http 통신을 할 때 사용하는 라이브러리
// 영화 데이터 요청, 서버 데이터를 전송 << 이게 postman의 get, post 인가 


import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

export default apiClient;