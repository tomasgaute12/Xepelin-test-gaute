import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { useState, useEffect } from 'react';
import { BankAccountForm } from './components/BankAccountForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);
  console.log("User:", user);
  return (
    <Router>
      
        <Routes>
          <Route exact path="/"
            element={user ? <Home user={user} setUser={setUser} /> : <Login setUser={setUser} />}>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route exact path="/bankform"
            element={user ? <BankAccountForm user={user} /> : <Login setUser={setUser} />}>
          </Route>
        </Routes>

    </Router>
  )
}

export default App;