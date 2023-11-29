import React from 'react'
import "../Styles/ShareModal.css"
import { toast } from 'react-hot-toast'
import { motion } from "framer-motion"
import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    PinterestIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

const ShareModal = ({ toggleShareModal, shareData }) => {

    const url = shareData.picturePath.replace("https://res.cloudinary.com", "www.socioscape.com")

    const handleCopy = async () => {
        console.log(shareData.picturePath)
        try {
            navigator.clipboard.writeText(shareData.picturePath)
            toast.success("Url copied to clipboard")
        }
        catch (err) {
            toast.error("Could not copy to clipboard")
        }
    }

    return (
        <div>
            <motion.div
                transition={{ duration: 0.2 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="modal">
                <div className="overlay">
                    <motion.div className="modal-content">
                        <motion.div
                            transition={{ duration: 0.5 }}
                            initial={{ scale: 0}}
                            animate={{ scale: 1 }}
                            exit={{ scale: 2 }}
                            className='share-main'>
                            <div className="share-header">
                                <span className='share-header-tagline'>Share Post</span>
                                <span><i className='fa fa-times' onClick={toggleShareModal}></i></span>
                            </div>
                            <div className="share-content">
                                <img className='share-picture' src={shareData.picturePath} alt="" />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span className='user-name-span'><span className='user-span'>User : </span>{`${shareData.firstName} ${shareData.lastName}`}</span>
                                    <span className='user-name-span'><span className='user-span'>Likes : </span>{<span>{Object.keys(shareData.likes).length}</span>}</span>
                                    <span className='user-name-span'><span className='user-span'>Comments : </span>{<span>{shareData.comments.length}</span>}</span>
                                </div>
                                <div>
                                    <div className="share-link">{url}</div>
                                </div>
                                <button className='copy-button' onClick={handleCopy}>Copy Link</button>
                            </div>

                            <div className="share-other">
                                <TwitterShareButton url={shareData.picturePath}>
                                    <TwitterIcon size={32} round={true} />
                                </TwitterShareButton>
                                <WhatsappShareButton url={shareData.picturePath}>
                                    <WhatsappIcon size={32} round={true} />
                                </WhatsappShareButton>
                                <TelegramShareButton url={shareData.picturePath}>
                                    <TelegramIcon size={32} round={true} />
                                </TelegramShareButton>
                                <FacebookShareButton url={shareData.picturePath}>
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                                <EmailShareButton url={shareData.picturePath}>
                                    <EmailIcon size={32} round={true} />
                                </EmailShareButton>
                                <PinterestShareButton url={shareData.picturePath}>
                                    <PinterestIcon size={32} round={true} />
                                </PinterestShareButton>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default ShareModal

