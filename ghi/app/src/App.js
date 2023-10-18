import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList'
import BinForm from './BinForm';
import BinList from './BinList'
import HatForm from './HatForm';
import HatList from './HatList';
import LocationForm from './LocationForm';
import LocationList from './LocationList';

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

          <Route path="bins">
            <Route path="" element={<BinList/>}/>
            <Route path="new" element={<BinForm/>} />
          </Route>

          <Route path="hats">
            <Route path="" element={<HatList/>} />
            <Route path="new" element={<HatForm/>} />
          </Route>

          <Route path="locations">
            <Route path="" element={<LocationList />} />
            <Route path = "new" element={<LocationForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
