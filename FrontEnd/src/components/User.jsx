import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useRefreshToken from '../hooks/useRefreshToken'

const User = () => {
    const [text, setText] = useState('')
    const refresh = useRefreshToken()
    const JWTAxios = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    const { auth } = useAuth();
    console.log("auth: ", auth.accessToken)
    const accessToken = auth?.accessToken

    useEffect(() => {
        const fetch = async () => {
            try {
                let result = await JWTAxios.get('/action', {
                    headers: { token: `Bearer ${accessToken}` }
                });
                console.log(result.data)
                setText(result.data)
            } catch (e) {
                console.log(e)
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        fetch()
    }, [auth])

    return (
        <>
            {text ?
                <h2>{text}</h2>
                : <h2>Nothing to display</h2>
            }
            <button onClick={() => refresh()}>Refresh</button>
        </>
    )
}

export default User