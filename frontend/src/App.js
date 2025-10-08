import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreatePost from './components/CreatePost';

function App() {
  return (
    // <div>
    // <SignUp/>  
    // <SignIn/>
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path='/signIn' element={<SignIn/>} />
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/create' element={<CreatePost/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
