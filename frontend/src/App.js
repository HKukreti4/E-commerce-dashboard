import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import UpdateProducts from "./components/UpdateProduct";
import Profile from "./components/Profile";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/update/:id" element={<UpdateProducts />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/logout" element={<h1>LogOut</h1>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
