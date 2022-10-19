import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';

function App() {
  return (
    <div style = {{padding:15}}>
      <Router>            
       
            <Route path='/' exact component={Login} />
            <Route path='/Dashboard' exact component={Dashboard} />          
            <Route path='/Register' exact component = {Register} />
              
      </Router>
    </div>
  );
}

export default App;


