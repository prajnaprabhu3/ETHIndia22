import AuthenticatedPage from './pages/AuthenticatedPage';
import Home from './pages/Home';
import CreateAlert from './pages/CreateAlert';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShowAlert from './pages/ShowAlert';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/started' element={<AuthenticatedPage/>}></Route>
     <Route path='/create-alert' element={<CreateAlert/>}></Route>
      <Route path='/alerts' element={<ShowAlert/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
