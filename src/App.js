import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Reader from './components/Reader';
import Writer from './components/Writer';

function App() {
  return (
    <div className="App">
      <nav className='sidebar'>
      <h2>AXIS</h2>
        <div className='profile'> 
            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' width={'40px'}></img>
            <h3>Name</h3>
        </div>
        <ul className='navbar'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reader">Reader</Link></li>
          <li><Link to="/writer">Writer</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/reader' element={<Reader/>}/>
        <Route exact path='/writer' element={<Writer/>}/>
      </Routes>

    </div>
  );
}

export default App;
