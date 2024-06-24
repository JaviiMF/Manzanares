import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'
import Register from './components/Register/Register';

function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Login />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
