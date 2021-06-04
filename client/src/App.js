import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import {UseRouts} from "./routes"
import "materialize-css";

function App() {
  const {login, userId}=useAuth()
  const isAuthenticated = !!userId
  const routes=UseRouts(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      login,userId,isAuthenticated
    }}>
    <Router>
    <div className="container">
      {routes}
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
