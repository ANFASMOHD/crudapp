import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './Components/Pages/Create';
import Home from './Components/Pages/Home';
import Update from './Components/Pages/Update';
import Read from './Components/Pages/Read';

function App() {
  return (
    <div className="App">
  
  <BrowserRouter>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/update/:id' element={<Update/>}/>
          <Route path='/read/:id' element={<Read/>}/>
         
         </Routes>
       </BrowserRouter>


    </div>
  );
}

export default App;
