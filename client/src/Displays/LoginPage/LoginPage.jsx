import React, { useEffect, useState } from 'react'
import Login from '../../Components/Login'
import LoaderScreen from '../LoaderPage/LoaderScreen';

function LoginPage() {
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
      <Login />
    </div>
  )
}

export default LoginPage