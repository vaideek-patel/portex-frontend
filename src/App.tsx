import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import RegisterForm from "./views/register/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
