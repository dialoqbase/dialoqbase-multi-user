import axios from 'axios';
import { supabase } from '../supabase';

const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    async (config) => {
        const { data } = await supabase.auth.getSession()
        const token =  data?.session?.access_token 
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    return instance(originalConfig);
                } catch (_error) {

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export default instance;