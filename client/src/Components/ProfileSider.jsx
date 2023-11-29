import React, { useEffect, useState } from 'react'
import "../Styles/ProfileSider.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

function ProfileSider({ userId }) {

    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)

    const getUserDetails = async () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/${userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                setUserDetails(response.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div>
            <motion.div
                transition={{ duration: 0.8 }}
                initial={{ opacity: 0, x: "-400px" }}
                animate={{ opacity: 1, x: "0px" }}
                exit={{ opacity: 0, x: "-400px" }}
                className="profile-wrapper">
                <div className="bio">
                    <div className="bio-image">
                        <img onClick={() => { navigate(`/profile/${userDetails._id}`) }} src={userDetails.picturePath} alt="" />
                        <div onClick={() => { navigate(`/profile/${userDetails._id}`) }} className="bio-info">
                            <span className="name"><b>{userDetails.firstName} &nbsp;
                                {userDetails.lastName}</b></span>
                            <span className="friend-count">{userDetails.friends === undefined ? 0 : userDetails.friends.length} Friends</span>
                        </div>
                    </div>
                    <div className="profile-icon">
                        <i className='fa fa-street-view'></i>
                    </div>
                </div>
                <hr />
                <div className="extra-info">
                    <div className="location-info">
                        <i className='fa fa-map-pin'></i>
                        <span>{userDetails.location}</span>
                    </div>
                    <div className="occupation-info">
                        <i className='fa fa-address-card'></i>
                        <span>{userDetails.occupation}</span>
                    </div>
                </div>
                <hr />
                <div>
                    <div className="views">
                        <div className="view-info">
                            Who viewed you profile
                        </div>
                        <div className="view-count">{userDetails.views}</div>
                    </div>
                    <div className="impressions">
                        <div className="impression-info">
                            Impressions of your Posts
                        </div>
                        <div className="impression-count">{userDetails.impressions}</div>
                    </div>
                </div>
                <hr />
                <div className="social-profiles">
                    <div className="twitter">
                        <div className="twitter-logo">
                            <i className='fa fa-twitter' style={{ color: "lightpurple" }}></i>
                        </div>
                        <div className="twitter-info">
                            <span className='company-name'>Twitter</span>
                            <span className='commpany-user-info'>
                                <i>@{userDetails.firstName}
                                    {userDetails.lastName}</i></span>
                        </div>
                    </div>
                    <div className="linkedin">
                        <div className="linkedin-logo">
                            <i className="fa fa-linkedin" style={{ color: "blue" }}></i>
                        </div>
                        <div className="linkedin-info">
                            <span className='company-name'>LinkedIn</span>
                            <span className='commpany-user-info'><i>/linkedin/{userDetails.firstName}</i></span>
                        </div>
                    </div>
                </div>


            </motion.div>
        </div>
    )
}

export default ProfileSider