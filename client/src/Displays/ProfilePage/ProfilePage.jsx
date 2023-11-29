import React, { useEffect, useState } from 'react'
import ProfileSider from '../../Components/ProfileSider'
import { useParams } from 'react-router-dom'
import "./ProfilePage.css"
import Navbar from '../../Components/Navbar'
import UserPosts from '../../Components/UserPosts'
import Posts from '../../Components/Posts'
import Advertisement from '../../Components/Advertisement'
import FriendList from '../../Components/FriendList'
import { motion } from 'framer-motion'
import LoaderScreen from '../LoaderPage/LoaderScreen'

function ProfilePage() {

  const { id } = useParams()

  const [openLoader, setOpenLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setOpenLoader(false);
    }, 1700);
  }, [])

  if (openLoader)
    return <LoaderScreen />

  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <motion.div 
          transition={{ duration: 0.8 }}
          initial={{ opacity: 0, x: "-400px" }}
          animate={{ opacity: 1, x: "0px" }}
          exit={{ opacity: 0, x: "-400px" }}>
          <ProfileSider userId={id} />
          <div style={{marginTop: "1rem"}}>
          <FriendList userId={id} />
          </div>
        </motion.div>
        <div className="postArea">
          <Posts />
          <UserPosts userId={id} />
        </div>
        <motion.div
          transition={{ duration: 0.8 }}
          initial={{ opacity: 0, x: "400px" }}
          animate={{ opacity: 1, x: "0px" }}
          exit={{ opacity: 0, x: "400px" }}
          className='right-sider'>
          <Advertisement />
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage