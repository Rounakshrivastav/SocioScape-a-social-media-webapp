import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Friends from './Friends'
import "../Styles/Friends.css"

function FriendList({ userId }) {

    const token = useSelector((state) => state.token)

    const [friendsList, setFriendsList] = useState([])

    const getFriends = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/${userId}/friends`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data)
                setFriendsList(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getFriends()
    }, [])

    return (
        <div className='friends-final-wrapper'>
            <span>User's Friend List</span>
            {friendsList.map((friend) => {
                return (
                    <div className="friends-wrapper">
                        <Friends name={`${friend.firstName} ${friend.lastName}`}
                            location={friend.location}
                            picturePath={friend.picturePath}
                        />
                    </div>
                )
            })
            }
        </div>
    )
}

export default FriendList