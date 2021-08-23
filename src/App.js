import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Movies from './pages/Movies'
import Members from './pages/Members';
import Contact from './pages/contact';

function App() {

    return (
        <Router>
            <Navbar/>
            <div style={{padding: '70px'}}>
                <Switch>
                    <Route path='/' exact component={Movies}/>
                    <Route path='/movies' component={Movies}/>
                    <Route path='/members' component={Members}/>
                    {/*<Route path='/services' component={Services} />*/}
                    <Route path='/contact-us' component={Contact}/>
                    {/*<Route path='/sign-up' component={SignUp} />*/}
                </Switch>
            </ div>
        </Router>

    );
}

export default App;
