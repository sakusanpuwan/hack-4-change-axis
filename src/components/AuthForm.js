import React from 'react'
import Login from './Login'
import Register from './Register'
import '../styling/Login.css'

const AuthForm = ({handleLoginStatus}) => {
  return (
    <div className='login-forms'>
        <Login handleLoginStatus = {handleLoginStatus}/>
        <Register handleLoginStatus = {handleLoginStatus}/>
    </div>
  )
}

export default AuthForm