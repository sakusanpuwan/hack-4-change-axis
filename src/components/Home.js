import '../styling/Home.css'
import Login from './Login';
import Register from './Register';

const Home = ({handleLoginStatus}) => {
    return (
        <div className='home-container'>
            <h1>Home</h1>
            <p>Explain what this app does. Features/Aim/Credits</p>
            <Login handleLoginStatus = {handleLoginStatus}/>
            <Register handleLoginStatus = {handleLoginStatus}/>
        </div>
        
    )
}

export default Home;