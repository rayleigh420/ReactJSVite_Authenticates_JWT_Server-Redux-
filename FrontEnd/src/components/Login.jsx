import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

import { getError, getStatus, login } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const dispath = useDispatch()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('');

    const status = useSelector(getStatus);
    const error = useSelector(getError)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit")
        try {
            dispath(login({ email: email, password: pwd }))
            // const response = await axios.post("/signIn",
            //     {
            //         email: email,
            //         password: pwd
            //     },
            //     {
            //         withCredentials: true
            //     }
            // );
            // console.log(response.data);
            // setAuth({
            //     userName: response.data.userName,
            //     email: response.data.email,
            //     admin: response.data.admin,
            //     accessToken: response.data.accessToken
            // })
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setPwd('');
            // setSuccess(true);

            navigate(from, { replace: true })
        } catch (err) {
            // console.log(err)
        }
    }

    return (
        <>
            {status == 'loading'
                ? <p>Loading</p>
                :
                <section>
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="confirm_pwd">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />

                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>

            }
        </>
    )
}

export default Login
