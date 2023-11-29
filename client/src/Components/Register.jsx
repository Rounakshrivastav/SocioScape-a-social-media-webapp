import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signup from "../assets/signup.jpg"
import logo from "../assets/logo.png"
import axios from "axios"
import "../Styles/Register.css"
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

function Register() {
    const navigate = useNavigate()

    const [registerData, setregisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        picturePath: "",
        location: "",
        occupation: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password
            || !registerData.picturePath || !registerData.location || !registerData.occupation) {
            toast.error("Please fill all Credentials")
            return
        }


        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: registerData.password,
            picturePath: registerData.picturePath,
            location: registerData.location,
            occupation: registerData.occupation,
        }).then((response) => {
            // console.log(response)
        }).catch((error) => {
            // console.log(error)
            toast.error(error.message)
        })
        toast.success("Registeration Successful")
        navigate("/login")
    }

    const uploadImages = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`)
        }
        const data = await axios
            .post(`${process.env.REACT_APP_CLOUDINARY_URL}`,
                formData
            )
            .then((response) => {
                console.log(response.data.secure_url);
                setregisterData({ ...registerData, picturePath: response.data.secure_url });
                toast.success("Profile picture added successfully")
            }).catch((err) => {
                toast.error(err.message + " picture adding unsuccessful")
                console.log(err.message)
            })
    }
    return (
        <div>
            <div className='signup-form-div'>
                <motion.div
                    transition={{ duration: 0.8 }}
                    animate={{ scale: 1 }}
                    initial={{ scale: 0.1 }}
                    className="register-image">
                    <img src={signup} alt="" />
                </motion.div>
                <motion.div
                    transition={{ duration: 0.8 }}
                    initial={{ opacity: 0, y: "+400px" }}
                    animate={{ opacity: 1, y: "0px" }}
                    exit={{ opacity: 0, y: "+400px" }}
                    className='register-second'>
                    <div className='welcome-register'>
                        <p className='welcome-text'>Welcome to</p>
                        <img src={logo} alt="" />
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div  >
                            <input className='photo-uploader' type="file" name='image' onChange={uploadImages} />
                        </div>
                        <div className='names'>
                            <input className='register-form-input'
                                type="text"
                                placeholder='Enter your First Name'
                                name='firstName'
                                value={registerData.firstName}
                                onChange={(e) => setregisterData({ ...registerData, firstName: e.target.value })}
                            />
                            <input className='register-form-input'
                                type="text"
                                placeholder='Enter your Last Name'
                                name='lastName'
                                value={registerData.lastName}
                                onChange={(e) => setregisterData({ ...registerData, lastName: e.target.value })}
                            />
                        </div>
                        <div className="email">
                            <input className='register-form-input'
                                type="email"
                                placeholder='Enter email'
                                name='email'
                                value={registerData.email}
                                onChange={(e) => setregisterData({ ...registerData, email: e.target.value })}
                            />
                        </div>
                        <div className="password">
                            <input className='register-form-input'
                                type="password"
                                placeholder='Enter Password'
                                name='password'
                                value={registerData.password}
                                onChange={(e) => setregisterData({ ...registerData, password: e.target.value })}
                            />
                        </div>
                        <div className="extra">
                            <input className='register-form-input'
                                type="text"
                                placeholder='Enter Location'
                                name='location'
                                value={registerData.location}
                                onChange={(e) => setregisterData({ ...registerData, location: e.target.value })}
                            />
                            <input className='register-form-input'
                                type="text"
                                placeholder='Enter Occupation'
                                name='occupation'
                                value={registerData.occupation}
                                onChange={(e) => setregisterData({ ...registerData, occupation: e.target.value })}
                            />
                        </div>
                        <div className="registerbtn">
                            <button
                                type='submit'
                                className='register-button'
                            >Register</button>
                        </div>
                    </form>
                    <p className='register-p toggle-helper'>Have an account? <span className='toggle-span' onClick={() => navigate("/")}>Login</span></p>
                </motion.div>
            </div>
        </div>
    )
}

export default Register