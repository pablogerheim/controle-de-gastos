import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from "./Home";
import { getUserEndpoint, IUser } from "./data/data";
import { LoginScreen } from "./LoginScreen";


function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (!user) {
    return (
    < >
      <Router>
        <Routes>
          <Route path="/despesas/:mes" element={<Home />}> </Route>
          <Route path="/" element={<Navigate to={'/despesas/2020-06'} />}/> 
        </Routes>
      </Router>
    </>
  );
} else {
  return <LoginScreen onSignIn={setUser} />;
}
}
export {App}

