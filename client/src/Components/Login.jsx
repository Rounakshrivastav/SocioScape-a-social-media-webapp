import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../States'
import axios from 'axios'
import login from "../assets/login.jpg"
import logo from "../assets/logo.png"
import "../Styles/Login.css"
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all Credentials")
            return
        }

        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
            email: loginData.email,
            password: loginData.password
        }).then((response) => {
            dispatch(setLogin({
                user: response.data.data,
                token: response.data.token
            }))
            toast.success("Login Successful")
            navigate("/")
        }).catch((error) => {
            console.log(error)
            toast.error("Credentials didn't match")
        })
    }

    return (
        <div className="login-main">
            <motion.div
                transition={{ duration: 0.8 }}
                initial={{ opacity: 0, y: "-400px" }}
                animate={{ opacity: 1, y: "0px" }}
                exit={{ opacity: 0, y: "-400px" }}
                className="login-form">
                <form onSubmit={handleLogin}>
                    <div className='welcome-register'>
                        <p className='welcome-text'>Welcome to</p>
                        <img src={logo} alt="" />
                    </div>
                    <div className="login-email">
                        <input className='login-form-input'
                            type="text"
                            placeholder='Enter email'
                            name='email'
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                    </div>
                    <div className="login-password">
                        <input className='login-form-input'
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                    </div>
                    <div className="loginbtn">
                        <button
                            type='submit'
                            className='register-button'
                        >Login</button>
                    </div>
                </form>
                <p className='toggle-helper'>New here? <span className='toggle-span' onClick={() => navigate("/register")}>Register</span></p>
            </motion.div>
            <motion.div
                transition={{ duration: 0.8 }}
                initial={{ opacity: 0, y: "+400px" }}
                animate={{ opacity: 1, y: "0px" }}
                exit={{ opacity: 0, y: "+400px" }}
                className="login-image">
                <img src={login} alt="" />
            </motion.div>
        </div>
    )
}

export default Login