import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ReaderText from './components/ReaderText';
import ReaderAudio from './components/ReaderAudio';
import WriterText from './components/WriterText';
import WriterAudio from './components/WriterAudio';


function App() {
  return (
    <div className="App">
      <nav className='sidebar'>
      <h2>AXIS</h2>
        <div className='profile'> 
            <img src='https://m.media-amazon.com/images/I/41jLBhDISxL._AC_UF1000,1000_QL80_.jpg' width={'40px'} style= {{borderRadius: "50%"}}></img>
            <h3>Name</h3>
        </div>
        <ul className='navbar'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reader-text">Reader Text</Link></li>
          <li><Link to="/reader-audio">Reader Audio</Link></li>
          <li><Link to="/writer-text">Writer Text</Link></li>
          <li><Link to="/writer-audio">Writer Audio</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/reader-text' element={<ReaderText/>}/>
        <Route path='/reader-audio' element={<ReaderAudio/>}/>
        <Route exact path='/writer-text' element={<WriterText/>}/>
        <Route exact path='/writer-audio' element={<WriterAudio/>}/>
      </Routes>

    </div>
  );
}

export default App;
