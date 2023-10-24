import React from 'react'
import Login from './Login'
import Register from './Register'
import '../styling/Login.css'

const AuthForm = ({handleLoginStatus}) => {
  return (
    <div className='auth-page'>
        <h2>Welcome To AXIS!</h2>
        <p>We're excited to have you join our community.By registering and logging in, you'll gain access to an array of features, including the ability to save and manage your text history</p>
        <div className='login-forms'>
            <Login handleLoginStatus = {handleLoginStatus}/>
            <Register handleLoginStatus = {handleLoginStatus}/>
        </div>
        <p>With registration and login, you're unlocking the power to personalize your experience and make the most of our platform. So, don't wait, get started today and explore the world of text history at your fingertips!</p>
    </div>

  )
}

export default AuthForm