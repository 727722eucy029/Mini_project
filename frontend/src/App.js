import logo from './logo.svg';
import ExploreEvents from './Components/ExploreEventsPage';
import HomePage from './Components/HomePage';
import LandingPage from './Components/Land/LandingPage';
import StaffSignIn from './Components/Land/StaffSignIn';
import StaffSignUp from './Components/Land/StaffSignUp';
import ProfilePage from './Components/ProfilePage';
import EventForm from './Components/EventForm';
import Post from './Components/Post';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExploreEventsPage from './Components/ExploreEventsPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="land" element={<LandingPage/>} />
        <Route path="/staff-signin" element={<StaffSignIn />} />
        <Route path="/signup" element={<StaffSignUp />} />
        <Route path="ExploreEvents" element={<ExploreEvents/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path='/Post' element={<Post/>}/>
      </Routes>
    </Router>
  );
}

export default App;
