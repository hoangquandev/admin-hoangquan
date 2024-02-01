import axios from 'axios';
import { store } from '../redux/store'; // Import store từ ứng dụng của bạn
import { clearTokens, setTokens } from '../redux/reducers/authReducer'; // Import actions từ reducers của bạn
import { logoutUser, refresh } from './auth';
import { clearUser } from '../redux/reducers/userReducer';

// Tạo một API mới của Axios
const API = axios.create({
    // baseURL: 'https://api-hoangquan.onrender.com',
    baseURL: 'http://localhost:8000',
});

API.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry && store.getState().auth.refreshToken) {
            originalRequest._retry = true
            try {
                const refreshToken = store.getState().auth.refreshToken
                const response = await refresh({ refreshToken })
                store.dispatch(setTokens({ accessToken: response.accessToken, refreshToken: store.getState().auth.refreshToken }));
                return API(originalRequest)
            } catch (error) {
                // handle resfresh error, logout user
                // const response = await logoutUser()
                store.dispatch(clearTokens())
                store.dispatch(clearUser())
            }
        }
        return Promise.reject(error)
    }
)





export default API;
