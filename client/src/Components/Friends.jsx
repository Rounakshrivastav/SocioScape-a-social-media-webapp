import React, { useEffect } from 'react'
import "../Styles/Friends.css"

function Friends({ name, location, picturePath, friendId }) {

    return (
        <>
            <div className='friends-wrapper-single'>
                <div>
                    <img className="friend-image-area" src={picturePath} alt="" />
                </div>
                <div className="friend-details">
                    <span className='friends-name'>{name}</span>
                    <span className='friend-bio'>{location}</span>
                </div>
            </div>
        </>
    )
}

export default Friends