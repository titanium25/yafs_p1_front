import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Members from './pages/Members';
import Users from './pages/Users';
import MovieData from "./pages/MovieData";
import Movie from "./pages/Movie";
import LoginPage from "./pages/Login";
import {FooterContainer} from './containers/footer'
import {useCallback, useContext, useEffect} from "react"
import {UserContext} from "./context/UserContext"
import Loader from "./components/Loader";
import LoginDAL from "./adapters/LoginDAL";
import Movies from "./pages/Movies";


function App() {

    const [userContext, setUserContext] = useContext(UserContext)

    const verifyUser = useCallback(async () => {

        fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async response => {
                if (response.ok) {
                    const data = await response.json()
                    setUserContext(oldValues => {
                        return {...oldValues, token: data.token}
                    })
                } else {
                    setUserContext(oldValues => {
                        return {...oldValues, token: null}
                    })
                }
                // call refreshToken every 5 minutes to renew the authentication token.
                setTimeout(verifyUser, 5 * 60 * 1000)
            })
    }, [setUserContext])

    console.log(userContext.token)

    useEffect(async () => {
        await verifyUser()
    }, [verifyUser])

    /**
     * Sync logout across tabs
     */
    const syncLogout = useCallback(event => {
        if (event.key === "logout") {
            // If using react-router-dom, you may call history.push("/")
            window.location.reload()
        }
    }, [])

    useEffect(() => {
        window.addEventListener("storage", syncLogout)
        return () => {
            window.removeEventListener("storage", syncLogout)
        }
    }, [syncLogout])


    return userContext.token === null ? (

        <LoginPage/>

    ) : userContext.token ? (

        <Router>
            <Navbar/>
            <div id="inner">
                <Switch>
                    <Route exact path='/' component={Movies}/>
                    <Route path='/movies' component={MovieData}/>
                    <Route path='/members' component={Members}/>
                    <Route path="/movie/:id" render={(props) => (<Movie {...props}/>)}/>
                    <Route path='/users' component={Users}/>
                </Switch>
            </ div>
            <FooterContainer/>
        </Router>

    ) : (
        <Loader/>
    );
}

export default App;
