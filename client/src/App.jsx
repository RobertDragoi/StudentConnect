import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <div className="d-flex flex-column">
      <Router>
        <PostState>
          <UserState>
            <NavBar />
            <Errors />
            <Switch>
              <Route exact path="/login">
                <LoginForm />
              </Route>
              <Route exact path="/register">
                <RegisterForm />
              </Route>
              <Route exact path="/jobs">
                <Home />
              </Route>
              <Route exact path="/users/:id">
                <User />
              </Route>
              <Route exact path="/post/:id">
                <FullPost />
              </Route>
              <Route exact path="/createpost">
                <PostForm />
              </Route>
              <Route exact path="/">
                <Welcome />
              </Route>
            </Switch>
            <Footer />
          </UserState>
        </PostState>
      </Router>
    </div>
  );
};

export default App;
