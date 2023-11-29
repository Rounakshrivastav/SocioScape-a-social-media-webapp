import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setPost } from '../States'
import "../Styles/AllPosts.css"
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

function UserPosts({ userId }) {

    const [feed, setFeed] = useState([])
    const dispatch = useDispatch()
    const [isCommentsVisible, setIsCommentsVisible] = useState({})
    const loggedUser = useSelector((state) => state.user._id)
    const [comment, setComment] = useState("")
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const loggedUserData = useSelector((state) => state.user)

    const [refresher, setRefresher] = useState(0)

    const getUserPosts = async () => {
        console.log(userId)
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                const alldata = response.data
                setFeed(alldata.reverse())
                // dispatch(setPosts({ posts: response }))
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUserPosts()
    }, [refresher])

    const handleComments = (id) => {
        setIsCommentsVisible({
            ...isCommentsVisible,
            [id]: !isCommentsVisible[id]
        })
    }

    const HandleAddComment = async (id) => {
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}/addcomment`, {
            commentData: ` ${loggedUserData.firstName} ${loggedUserData.lastName} : ${comment}`
        },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response)
                dispatch(setPost({ post: response }))
                setComment("")
                toast.success("Comment added")
                setRefresher((refresher) => refresher + 1)
            }).catch((err) => {
                console.log(err)
            });
    }

    const HandleLike = async (id) => {
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}/like`, {
            userId: loggedUser
        },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response)
                dispatch(setPost({ post: response }))
                setRefresher((refresher) => refresher + 1)
            }).catch((error) => {
                console.log(error)
            })
    }



    return (
        <motion.div

            initial={{ opacity: 0, y: "-200vh" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-200vh" }}
            transition={{ duration: 1, delay: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}

            className="posts-wrapper">
            {feed.map((post) => {
                return (
                    <div className="single-post">
                        <div className='post-header'>
                            <div>
                                <img onClick={() => { navigate(`/profile/${post.userId}`) }} className="post-user-pic" src={post.userPicturePath} alt="" />
                            </div>
                            <div onClick={() => { navigate(`/profile/${post.userId}`) }} className="user-details">
                                <span>{post.firstName}&nbsp;{post.lastName}</span>
                                <p>{post.location}</p>
                            </div>
                        </div>
                        <i className='fa fa-user-plus'></i>
                        <div>
                            <p className='post-description'>{post.description}</p>
                            <img className='main-post-image' src={post.picturePath} alt="" />
                        </div>
                        <div className='post-reaction-area likes-comments'>
                            <div style={{display: "flex", margin: "5px 0"}}>
                                <div className="like-area">
                                    <i className={Boolean(post.likes[loggedUser]) === true ? "fa fa-heart" : "fa fa-heart-o"}
                                        onClick={() => HandleLike(post._id)}></i><span>{Object.keys(post.likes).length}</span>
                                </div>
                                <div className='like-area'>
                                    <i className='fa fa-commenting-o' onClick={() => handleComments(post._id)}></i><span>{post.comments.length}</span>
                                </div>
                            </div>
                            <div className="comment-area">
                                <input
                                    type="text"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    placeholder='Add Comment'
                                    className='comment-input'
                                />
                                <input className='comment-btn' type="submit" value="Comment" onClick={() => HandleAddComment(post._id)} />
                            </div>
                        </div>
                        <div className={isCommentsVisible[post._id] ? "comment-section visible" : "invisible"}>
                            {post.comments.map((comment, i) => {
                                return (
                                    <div>
                                        <span style={{ fontWeight: "bolder" }}>{i + 1}.</span> <span>{comment}</span>
                                        < hr style={{ margin: "1px" }} />
                                    </div>
                                )
                            })}
                        </div>
                        <hr />
                    </div>
                )
            })}



        </motion.div >
    )
}

export default UserPosts