import axios from "../api/axios";
import useAuth from "./useAuth"

const useLogout = () => {
    const { auth, setAuth } = useAuth();

    const logOut = async () => {
        setAuth({})
        try {
            const result = await axios.get('/signOut', {
                headers: { token: `Bearer ${auth?.accessToken}` },
                withCredentials: true
            })
            console.log(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    return logOut
}

export default useLogout