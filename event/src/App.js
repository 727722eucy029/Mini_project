import logo from './logo.svg';
import ExploreEvents from './Components/ExploreEventsPage';
import HomePage from './Components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< HomePage/>} />
        <Route path="ExploreEvents" element={<ExploreEvents/>}/>
      </Routes>
    </Router>
  );
}

export default App;
