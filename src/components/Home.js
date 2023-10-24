import '../styling/Home.css'
import Login from './Login';
import Register from './Register';

const Home = ({handleLoginStatus}) => {
    return (
        <div className='home-container'>
            <h1>Home</h1>
            <h2>Unlocking Inclusivity Through AI-Powered Literacy</h2>
            <p style={{color:"red"}}>Explain what this app does. Features/Aim/Credits</p>
            <div className='login-forms'>
                <Login handleLoginStatus = {handleLoginStatus}/>
                <Register handleLoginStatus = {handleLoginStatus}/>
            </div>

        </div>
        
    )
}

export default Home;