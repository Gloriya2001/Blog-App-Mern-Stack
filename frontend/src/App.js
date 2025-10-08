import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CreatePost from "./components/CreatePost";
import ViewAll from "./components/ViewAll";
import ViewMyPost from "./components/ViewMyPost";

function App() {
  return (
    // <div>
    // <SignUp/>
    // <SignIn/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/viewAll" element={<ViewAll />} />
      <Route path="/viewMyPost" element={<ViewMyPost/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
