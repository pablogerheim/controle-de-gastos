import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from "./Home";
import { IUser} from "./data/data";
import { LoginScreen } from "./LoginScreen";


function App() {
  const [user, setUser] = useState<IUser | null>(null);

  if (user) {
    return (
      < >
        <Router>
          <Routes>
            <Route path="/despesas/:mes" element={<Home id={user.id} name={user.name} email={user.email} token={user.token} />}> </Route>
            <Route path="/" element={<Navigate to={'/despesas/2020-06'} />} />
          </Routes>
        </Router>
      </>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export { App }

// function res(res: any): any {
//   throw new Error('Function not implemented.');
// }

