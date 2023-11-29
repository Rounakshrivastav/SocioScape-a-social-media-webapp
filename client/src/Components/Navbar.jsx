import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import "../Styles/Navbar.css"
import { motion } from 'framer-motion'
import LogoutModal from './LogoutModal'

function Navbar() {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const [search, setsearch] = useState("")

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const name = `${user.firstName}`

    return (

        <div>
            {modal && <LogoutModal modal={modal} toggleModal={toggleModal} />}
            <motion.div
                transition={{ duration: 1.2 }}
                initial={{ opacity: 0, y: "-400px" }}
                animate={{ opacity: 1, y: "0px" }}
                exit={{ opacity: 0, y: "-400px" }}
                className="navbar">
                <div className='first'>
                    <div>
                        <img src={logo} alt="company-logo" onClick={() => { navigate("/") }} />
                    </div>
                    <div>
                        <input
                            type="text"
                            className='search-bar'
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder='Search Posts...'
                        />
                        <i className="fa fa-search"></i>
                    </div>
                </div>
                <div className="second">
                    <div className="name-area">
                        <div className="active"></div>
                        {name}
                    </div>
                    <button onClick={toggleModal}>Logout</button>
                </div>
            </motion.div>
        </div>
    )
}

export default Navbar
