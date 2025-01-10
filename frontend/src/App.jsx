import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Nonveg from "./components/subcomponents/Nonveg";
import Veg from "./components/subcomponents/Veg";
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import Booking from './components/subcomponents/Booking';
import RecipeDetails from "./components/RecipeDetails";
import ThankYou from './components/ThankYou';
import { AuthProvider, useAuth } from './components/AuthContext';
import fooddata from "./recipes.json";
import './App.css'
import Aos from 'aos'
import "aos/dist/aos.css"

const ProtectedRoute = ({ element }) => {
  const { loggedInUsername } = useAuth();
  return loggedInUsername ? element : <Navigate to="/login" />;
};

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(fooddata);
    Aos.init();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/signupForm" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
          <Route path="/veg" element={<ProtectedRoute element={<Veg />} />} />
          <Route path="/nonveg" element={<ProtectedRoute element={<Nonveg />} />} />
          <Route path="/gallery" element={<ProtectedRoute element={<Gallery recipes={recipes}/>} />} />
          <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
          <Route path="/recipe/:id" element={<ProtectedRoute element={<RecipeDetails recipes={recipes}/>} />} />
          <Route path="/thank-you" element={<ProtectedRoute element={<ThankYou />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
