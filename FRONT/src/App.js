import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RoomAviable from './components/RoomAviable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Home/>
        <RoomAviable/>
    </div>
  );
}

export default App;
