import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList'
import HatForm from './HatForm';
import HatList from './HatList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="shoes">
            <Route path="" element={<ShoeList/>}/>
            <Route path="new" element={<ShoeForm/>} />
          </Route>

          <Route path="hats">
            <Route path="" element={<HatList/>} />
            <Route path="new" element={<HatForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
