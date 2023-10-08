import HomePage from './Components/HomePage/HomePage'
import Surah from './Components/Chapter/Surah'
import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/audio' element={<Surah></Surah>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
