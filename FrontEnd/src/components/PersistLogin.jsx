import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken"

const PersistLogin = () => {
    const [isLoding, setIsLoding] = useState(true)
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await refresh();
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoding(false)
            }
        }

        !auth?.accessToken ? verifyToken() : setIsLoding(false);
    }, [])

    useEffect(() => {
        console.log('isLoding: ', isLoding)
        console.log("access Token", auth?.accessToken)
    }, [isLoding])

    return (
        <>
            {isLoding
                ? <p>Loading...</p>
                : <Outlet />

            }
        </>
    )
}

export default PersistLogin