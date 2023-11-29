import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import ProfileSider from '../../Components/ProfileSider'
import "./HomePage.css"
import { useSelector } from 'react-redux'
import Posts from '../../Components/Posts'
import AllPosts from '../../Components/AllPosts'
import FriendList from '../../Components/FriendList'
import Advertisement from '../../Components/Advertisement'
import { motion } from 'framer-motion'
import LoaderScreen from '../LoaderPage/LoaderScreen'

function HomePage() {

  const _id = useSelector((state) => state.user._id)

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
      <div className="home-main">
        <div className='profile-sider-div'>
          <ProfileSider userId={_id} />
        </div>
        <motion.div
          className="postArea">
          <Posts />
          <AllPosts />
        </motion.div>
        <motion.div
          transition={{ duration: 0.8 }}
          initial={{ opacity: 0, x: "+400px" }}
          animate={{ opacity: 1, x: "0px" }}
          exit={{ opacity: 0, x: "+400px" }}
          className='right-sider'>
          <Advertisement />
          <FriendList userId={_id} />
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage