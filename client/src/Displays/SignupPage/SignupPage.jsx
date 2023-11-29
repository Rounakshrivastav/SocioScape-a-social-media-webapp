import React, { useEffect, useState } from 'react'
import Register from '../../Components/Register'
import LoaderScreen from '../LoaderPage/LoaderScreen';

function SignupPage() {

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
            <Register />
        </div>
    )
}

export default SignupPage