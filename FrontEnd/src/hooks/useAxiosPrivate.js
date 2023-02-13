import { JWTAxios } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = JWTAxios.interceptors.request.use(
            config => {
                if (!config.headers.token) {
                    config.headers.token = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = JWTAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.token = `Bearer ${newAccessToken}`;
                    return JWTAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            JWTAxios.interceptors.request.eject(requestIntercept);
            JWTAxios.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return JWTAxios;
}

export default useAxiosPrivate;