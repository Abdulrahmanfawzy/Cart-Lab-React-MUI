import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CartRoute from "./components/CartRoute/CartRoute";
import useWindowSize from "./components/customHook/windowHook";

export default function App() {
  const { width, height } = useWindowSize();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <div style={{position: "fixed" , bottom: "20px", left: "20px"}}>
          <p>Width: {width}px</p>
          <p>Height: {height}px</p>
        </div>
        <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route path="/cart" element={<CartRoute/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Provider>

    </BrowserRouter>
  )
}
