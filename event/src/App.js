import logo from './logo.svg';
import ExploreEvents from './Components/ExploreEventsPage';
import HomePage from './Components/HomePage';
import ProfilePage from './Components/ProfilePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< ProfilePage/>} />
        <Route path="ExploreEvents" element={<ExploreEvents/>}/>
      </Routes>
    </Router>
  );
}

export default App;
