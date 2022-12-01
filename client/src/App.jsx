import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Pages/LoginForm/LoginForm';
import RegisterForm from './components/Pages/RegisterForm/RegisterForm';
import PostForm from './components/Pages/PostForm/PostForm';
import Home from './components/Pages/Home/Home';
import NavBar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import User from './components/Pages/User/User';
import FullPost from './components/Pages/FullPost/FullPost';
import Welcome from './components/Pages/Welcome/Welcome';
import Errors from './components/Layout/Errors/Errors';
import PostState from './state/PostState/PostState';
import UserState from './state/UserState/UserState';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <div className="d-flex flex-column">
      <Router>
        <PostState>
          <UserState>
            <QueryClientProvider client={queryClient}>
              <NavBar />
              <Errors />
              <Routes>
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/register" element={<RegisterForm />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/users/:id" element={<User />} />
                <Route exact path="/post/:id" element={<FullPost />} />
                <Route exact path="/createpost" element={<PostForm />} />
                <Route exact path="/" element={<Welcome />} />
              </Routes>
              <Footer />
            </QueryClientProvider>
          </UserState>
        </PostState>
      </Router>
    </div>
  );
};

export default App;
