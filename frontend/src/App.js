import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostForm from './components/PostForm';
import Home from './components/Pages/Home';
import NavBar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import User from './components/Pages/User';
import PostState from './state/PostState/PostState';
import UserState from './state/UserState/UserState';
import FullPost from './components/Pages/FullPost';
import Welcome from './components/Pages/Welcome';
import Errors from './components/Layout/Errors';
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
