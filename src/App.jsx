import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PostDetails from './pages/PostDetails.jsx';
import EditPost from './pages/EditPost.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;