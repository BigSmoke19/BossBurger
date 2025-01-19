//import logo from './logo.svg';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './home';
import Menu from './menu';
import NavBar from "./navbar";
import Contact from './contact';
import Order from './order';

function App() {
  return (
    <div className="App">
      
      <Router>
        <div className="content">
          <Routes>
            <Route
              exact path='/'
              element={<Home />}
            />
            <Route
              exact path='/menu'
              element={<Menu />}
            />
            <Route
              exact path='/contact'
              element={<Contact />}
            />
            <Route
              exact path='/order'
              element={<Order />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
