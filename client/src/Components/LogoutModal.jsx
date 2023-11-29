import React from 'react'
import "../Styles/LogoutModal.css"
import { useDispatch } from 'react-redux'
import { setLogout } from '../States'
import { motion } from 'framer-motion'

function LogoutModal({ modal, toggleModal }) {

    const dispatch = useDispatch()

    return (
        <div>

            <motion.div
            transition={{ duration: 0.2 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
                className="modal">
                <div className="overlay">
                    <motion.div
                        className="modal-content">
                        <motion.div transition={{ duration: 0.5 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }} className="logout-modal">
                            <span>Are You sure,You want to logout?</span>
                            <div className="logoutbtns">
                                <button className='yes-btn' onClick={() => dispatch(setLogout())}>Yes</button>
                                <button className='cancel-btn' onClick={toggleModal}>Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    )
}

export default LogoutModal