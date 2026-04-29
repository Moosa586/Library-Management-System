import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AddBook from "./Pages/AddBook";
import BookList from "./Pages/BookList";
import Navbar from "./Compoenets/Navbar";
import Home from "./Pages/Home";
import Footer from "./Pages/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/books" element={<BookList />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
