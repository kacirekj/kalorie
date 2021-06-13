import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Redirect, Link, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <nav className="navbar navbar">
                    <ul className="nav">
                        <li>
                            <Link to="/">Zaznamy</Link>
                        </li>
                        <li>
                            <Link to="/category">Potraviny</Link>
                        </li>
                        <li>
                            <Link to="/products">Uzivatele</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <Home test="123"/>
                    </Route>
                </Switch>
            </BrowserRouter>


        </div>
    );
}


//Home component
const Home = (props) => (
    <div>
        <h2>Home {props.test}</h2>
    </div>
);

export default App;