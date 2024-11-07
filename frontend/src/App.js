import logo from './logo.svg';
import { AuthProvider } from './Components/AuthContext';
import ExploreEvents from './Components/ExploreEventsPage';
import HomePage from './Components/HomePage';
import LandingPage from './Components/Land/LandingPage';
import StaffSignup from './Components/Land/StaffSignUp';
import SignIn from './Components/Land/Signin';
import SignUp from './Components/Land/Signup';
import ProfilePage from './Components/ProfilePage';
import EventForm from './Components/EventForm';
import ProfileForm from './Components/ProfileForm';
import StaffProfileForm from './Components/StaffProfileForm';
import Post from './Components/Post';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExploreEventsPage from './Components/ExploreEventsPage';
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProfilePage/>} /> */}
        {/* <Route path="/" element={<LandingPage/>} />
        <Route path="land" element={<LandingPage/>} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/staffsignup" element={<StaffSignup/>}/>
        <Route path="ExploreEvents" element={<ExploreEvents/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path='/Post' element={<EventForm/>}/>
        <Route path='ProfileForm' element={<ProfileForm/>}/>
        <Route path='/ProfilePage' element={<ProfilePage/>}/>
        <Route path='/StaffProfileForm' element={<StaffProfileForm/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
