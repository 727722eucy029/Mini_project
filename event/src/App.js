import logo from './logo.svg';
import ExploreEvents from './Components/ExploreEventsPage';
import HomePage from './Components/HomePage';
import LandingPage from './Components/Land/LandingPage';
import StaffSignIn from './Components/Land/StaffSignIn';
import StaffSignUp from './Components/Land/StaffSignUp';
import ProfilePage from './Components/ProfilePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="land" element={<LandingPage/>} />
        <Route path="/staff-signin" element={<StaffSignIn />} />
        <Route path="/signup" element={<StaffSignUp />} />
        <Route path="ExploreEvents" element={<ExploreEvents/>}/>
      </Routes>
    </Router>
  );
}

export default App;
