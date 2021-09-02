import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Members from './pages/Members';
import Users from './pages/Users';
import MovieData from "./pages/MovieData";

function App() {

    return (
        <Router>
            <Navbar/>
            <div id="inner">
                <Switch>
                    <Route path='/' exact component={MovieData}/>
                    <Route path='/movies' component={MovieData}/>
                    <Route path='/members' component={Members}/>
                    {/*<Route path='/services' component={Services} />*/}
                    <Route path='/users' component={Users}/>
                    {/*<Route path='/sign-up' component={SignUp} />*/}
                </Switch>
            </ div>
        </Router>

    );
}

export default App;
